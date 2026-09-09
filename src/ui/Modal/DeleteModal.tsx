import { Modal } from "antd";
import ReuseButton from "../Button/ReuseButton";

interface DeleteModalProps<T> {
  isDeleteModalVisible: boolean;
  handleCancel: () => void;
  currentRecord: T | null;
  handleDelete: (data: T) => void;
}

const DeleteModal = <T,>({
  isDeleteModalVisible,
  handleCancel,
  currentRecord,
  handleDelete,
}: DeleteModalProps<T>) => {
  //   const [blockUser] = useBlockUserMutation();

  return (
    <Modal
      // title="Confirm Delete"
      open={isDeleteModalVisible}
      onOk={() => handleDelete(currentRecord as T)} // ✅ Correct
      onCancel={handleCancel}
      okText="delete"
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
          <ReuseButton
            variant="highlight"
            className="!px-6 !py-5 mr-4 w-fit flex items-center justify-center gap-2"
            onClick={handleCancel}
          >
            Cancel
          </ReuseButton>
          <ReuseButton
            variant="error"
            className="!px-6 !py-5 w-fit flex items-center justify-center gap-2"
            onClick={() => handleDelete(currentRecord as T)}
          >
            Delete
          </ReuseButton>
        </div>
      }
    >
      <p className="text-3xl font-semibold pt-10 pb-4 text-base-color">
        Are You Sure You want to Delete This?
      </p>
    </Modal>
  );
};

export default DeleteModal;
