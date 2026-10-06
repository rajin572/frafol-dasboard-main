import { useState } from "react";
import ReuseButton from "./ReuseButton";
import { useGetAllSubscriptionQuery } from "../../redux/features/frafolSubscription/susbcriptionApi";
import { ISubscription, ITransaction } from "../../types";
import { downloadInvoices } from "../../utils/invoice/downloadInvoices";
import { buildSubscriptionTransactionInvoice } from "../../utils/invoice/transactionInvoices";

// Frafol Choice invoice (Frafol -> professional) of a subscription transaction.
const SubscriptionInvoiceButton: React.FC<{ transaction: ITransaction }> = ({ transaction }) => {
  // Same query (and cache) as the Frafol Choice page: used to find the package of the purchase.
  const { data } = useGetAllSubscriptionQuery({});
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async () => {
    setDownloading(true);
    try {
      const packs: ISubscription[] = data?.data || [];
      await downloadInvoices(
        [buildSubscriptionTransactionInvoice(transaction, packs)],
        `frafol-choice-invoice-${transaction._id.slice(-8)}.pdf`
      );
    } finally {
      setDownloading(false);
    }
  };

  return (
    <ReuseButton
      variant="secondary"
      className="!px-5 !py-4 !w-fit"
      loading={downloading}
      onClick={handleDownload}
    >
      Download Invoice
    </ReuseButton>
  );
};

export default SubscriptionInvoiceButton;
