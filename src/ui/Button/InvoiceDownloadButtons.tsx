import { useState } from "react";
import ReuseButton from "./ReuseButton";
import { finalInvoices, paymentInvoices } from "../../utils/invoice/assembleInvoices";
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

// The four invoices of an order, one PDF per button, plus the client's combined PDFs: like on the
// website, the client gets Professional -> Client and Admin -> Client as the two pages of one PDF.
// The service fee invoices (Client - Admin) do not exist when the service fee is 0, so those
// buttons, and the combined ones (which would be the same single page), are left out.
const InvoiceDownloadButtons: React.FC<InvoiceDownloadButtonsProps> = ({
  orderId,
  getInvoices,
  showPayment,
  showFinal,
  compact = false,
}) => {
  const [downloading, setDownloading] = useState<string | null>(null);

  if (!showPayment && !showFinal) return null;

  const set = getInvoices();
  const single = (invoice?: InvoiceData): InvoiceData[] => (invoice ? [invoice] : []);
  const buttons: InvoiceButton[] = [
    ...(showPayment
      ? [
          {
            key: "creatorPayment",
            label: "Professional - Client (Payment)",
            fileSuffix: "professional-client-payment",
            invoices: single(set.creatorPayment),
          },
          {
            key: "feePayment",
            label: "Client - Admin (Payment)",
            fileSuffix: "client-admin-payment",
            invoices: single(set.feePayment),
          },
        ]
      : []),
    ...(showFinal
      ? [
          {
            key: "creatorFinal",
            label: "Professional - Client (Final)",
            fileSuffix: "professional-client-final",
            invoices: single(set.creatorFinal),
          },
          {
            key: "feeFinal",
            label: "Client - Admin (Final)",
            fileSuffix: "client-admin-final",
            invoices: single(set.feeFinal),
          },
        ]
      : []),
    ...(showPayment && set.feePayment
      ? [
          {
            key: "clientPayment",
            label: "Both Invoices - Client (Payment)",
            fileSuffix: "client-payment",
            invoices: paymentInvoices(set),
          },
        ]
      : []),
    ...(showFinal && set.feeFinal
      ? [
          {
            key: "clientFinal",
            label: "Both Invoices - Client (Final)",
            fileSuffix: "client-final",
            invoices: finalInvoices(set),
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
