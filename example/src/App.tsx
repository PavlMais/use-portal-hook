import { PortalComponent, usePortal } from "use-portal-hook";

interface DeleteModalProps {
  title: string;
}

const DeleteModal: PortalComponent<DeleteModalProps, boolean> = ({
  onClose,
  props,
}) => {
  return (
    <div
      style={{
        border: "1px solid black",
        height: 200,
        width: 200,
        position: "absolute",
        background: "white",
      }}
    >
      {props.title}
      <button onClick={() => onClose(false)}>Cancel</button>
      <button onClick={() => onClose(true)}>Delete</button>
    </div>
  );
};

export function App() {
  const showDeleteModal = usePortal(DeleteModal);

  const handleDelete = () => {
    showDeleteModal({ title: "Delete" }).then((confirm) => {
      console.log({ confirm });
    });
  };

  return <button onClick={handleDelete}>SHOW MDOALS</button>;
}
