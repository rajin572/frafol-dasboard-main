import { Button, Modal } from "antd";

const DeleteSubscriptionModal = ({
  isDeleteModalOpen,
  handleCancelDeleteModal,
  currentRecord,
}) => {
  //   const [deleteSubscription] = useDeleteSubscriptionMutation();
  const handleDelete = async () => {
    console.log({ id: currentRecord?._id });
    // const toastId = toast.loading("Deleting subscription...");
    // try {
    //   const res = await deleteSubscription({ id: currentRecord?._id }).unwrap();
    //   toast.success(res?.message, {
    //     id: toastId,
    //     duration: 2000,
    //   });
    //   handleCancelDeleteModal();
    // } catch (error) {
    //   console.log(error);
    //   toast.error("Failed to delete subscription", {
    //     id: toastId,
    //     duration: 2000,
    //   });
    // }
  };
  return (
    <Modal
      // title="Confirm Delete"
      open={isDeleteModalOpen}
      onOk={handleDelete}
      onCancel={() => handleCancelDeleteModal()}
      okText="Leave Conversation"
      cancelText="Cancel"
      centered
      style={{ textAlign: "center" }}
      // styles.body={{ textAlign: "center" }}
      footer={
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            paddingBottom: "40px",
            marginTop: "30px",
          }}
        >
          <Button
            className="text-xl py-5 px-8 !text-base-color"
            type="primary"
            onClick={() => handleCancelDeleteModal()}
            style={{
              marginRight: 12,
              background: "rgba(221, 221, 221, 1)",
              color: "black",
            }}
          >
            Cancel
          </Button>
          <Button
            className="text-xl py-5 px-8"
            type="primary"
            style={{ background: "#FA4A0D" }}
            onClick={handleDelete}
          >
            Delete
          </Button>
        </div>
      }
    >
      <p className="text-3xl font-semibold pt-10 pb-4">
        Do you want to Delete this Subscription?
      </p>
    </Modal>
  );
};

export default DeleteSubscriptionModal;
