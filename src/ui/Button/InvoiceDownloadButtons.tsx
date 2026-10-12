import { useState } from "react";
import ReuseButton from "./ReuseButton";
import { downloadInvoices } from "../../utils/invoice/downloadInvoices";
import { InvoiceData, InvoiceSet } from "../../utils/invoice/invoiceTypes";

interface InvoiceDownloadButtonsProps {
  // Full order ID, used for the file names.
  orderId: string;
  // Builds the four invoices of the order (only called when a button is shown).
  getInvoices: () => InvoiceSet;
  // Payment invoices: once the order is paid.
  showPayment: boolean;
  // Final invoices: once the order is completed.
  showFinal: boolean;
  // Smaller buttons for table cells.
  compact?: boolean;
}

interface InvoiceButton {
  key: string;
  label: string;
  fileSuffix: string;
  // Pages of the PDF, in order.
  invoices: InvoiceData[];
}

// The four invoices of an order, one PDF per button: Professional -> Client and Admin -> Client,
// for the payment (available once paid) and the final settlement (available once completed).
// The service fee invoice (Admin -> Client) does not exist when the service fee is 0, so that
// button is left out.
const InvoiceDownloadButtons: React.FC<InvoiceDownloadButtonsProps> = ({
  orderId,
  getInvoices,
  showPayment,
  showFinal,
  compact = false,
}) => {
  const [downloading, setDownloading] = useState<string | null>(null);

  if (!showPayment && !showFinal) return null;

  // A completed order was necessarily paid: once delivered, always show all four invoices, even
  // if the order's own paid-flag was never set correctly.
  const paymentVisible = showPayment || showFinal;

  const set = getInvoices();
  const single = (invoice?: InvoiceData): InvoiceData[] => (invoice ? [invoice] : []);
  const buttons: InvoiceButton[] = [
    ...(paymentVisible
      ? [
          {
            key: "creatorPayment",
            label: "Professional → Client (Payment)",
            fileSuffix: "professional-client-payment",
            invoices: single(set.creatorPayment),
          },
          {
            key: "feePayment",
            label: "Admin → Client (Payment)",
            fileSuffix: "admin-client-payment",
            invoices: single(set.feePayment),
          },
        ]
      : []),
    ...(showFinal
      ? [
          {
            key: "creatorFinal",
            label: "Professional → Client (Final)",
            fileSuffix: "professional-client-final",
            invoices: single(set.creatorFinal),
          },
          {
            key: "feeFinal",
            label: "Admin → Client (Final)",
            fileSuffix: "admin-client-final",
            invoices: single(set.feeFinal),
          },
        ]
      : []),
  ];

  const handleDownload = async ({ key, fileSuffix, invoices }: InvoiceButton) => {
    setDownloading(key);
    try {
      await downloadInvoices(invoices, `${orderId}-${fileSuffix}.pdf`);
    } finally {
      setDownloading(null);
    }
  };

  return (
    <div className="grid grid-cols-2 gap-3">
      {buttons
        .filter((button) => button.invoices.length > 0)
        .map((button) => (
          <ReuseButton
            key={button.key}
            variant="secondary"
            className={compact ? "!py-1 !px-2 !text-xs !h-auto" : "!py-2.5 !px-3 !text-sm"}
            loading={downloading === button.key}
            disabled={downloading !== null}
            onClick={() => handleDownload(button)}
          >
            {button.label}
          </ReuseButton>
        ))}
    </div>
  );
};

export default InvoiceDownloadButtons;
