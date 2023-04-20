import { useHistory } from "react-router-dom";

export default function ConfirmationPage() {
  const history = useHistory();
  const home = () => {
    history.push("/flights");
  };
  return (
    <>
      {" "}
      <div className="confirmation_page">
        <div className="confirmed">Your reservation has been confirmed</div>
        <button onClick={home} className="btn-confirm">
          Back
        </button>
      </div>
    </>
  );
}
