import { useEffect, useState } from "react";
import { formatDuration } from "../../utils/duration";
import Modal from "./Modal";
import useModal from "./useModal";
import { useHistory } from "react-router-dom";
import duration_line from "../../duration_line.png";
import FlightsNavbar from "./FlightsNavbar";

const Flights = () => {
  const [result, setResult] = useState<ConversionData[]>([]);
  const [loading, setLoading] = useState(true);
  const [test, setTest] = useState(false);
  const [error, setError] = useState(null);
  const { isOpen, toggle } = useModal();

  const history = useHistory();
  type ConversionData = {
    uuid: string;
    airlineCode: string;
    price: {
      amount: number;
      currency: string;
    };
    bounds: Array<{
      departure: {
        code: string;
        name: string;
        dateTime: string;
      };
      destination: {
        code: string;
        name: string;
        dateTime: string;
      };
      duration: string;
    }>;
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch("http://localhost:3001/flights");
        if (!response.ok) {
          throw new Error(
            `This is an HTTP error: The status is ${response.status}. Please refresh the page`
          );
        }
        let actualData = await response.json();

        setResult(actualData as unknown as ConversionData[]);
        setError(null);
      } catch (err: any) {
        setError(err.message);
        setResult(null as unknown as ConversionData[]);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  return (
    <div className="App">
      <div>
        <FlightsNavbar />
      </div>
      <div className="title">Check available flights:</div>
      {loading && <div className="centre">A moment please...</div>}
      {error && (
        <div>{`There is a problem fetching the post data - ${error}`}</div>
      )}
      {result?.map((value) => {
        const dep_time_from_b0 = new Date(value.bounds[0].departure.dateTime);
        const des_time_to_b0 = new Date(value.bounds[0].destination.dateTime);
        const dep_time_from_b1 = new Date(value.bounds[1]?.departure.dateTime);
        const des_time_to_b1 = new Date(value.bounds[1]?.destination.dateTime);
        const duration_b0 = value.bounds[0].duration;
        const parse_b0 = formatDuration(duration_b0);
        const duration_b1 = value.bounds[1]?.duration;
        let parse_b1;

        if (duration_b1 == undefined) {
          formatDuration("PT0S");
        } else {
          parse_b1 = formatDuration(duration_b1);
        }

        const handleClick = async () => {
          //POST
          history.push("/confirmationpage");
        };

        return (
          <>
            {" "}
            <Modal isOpen={isOpen} toggle={toggle}>
              <div>UUID:{value.uuid}</div>
            </Modal>
            <div className="container" key={value.uuid}>
              <div className="price">
                {" "}
                <div className="price_value">
                  <h2 className="amount">
                    {value.price.amount}
                    {value.price.currency}
                  </h2>
                  <button onClick={handleClick} id={value.uuid} className="btn">
                    Book flight
                  </button>{" "}
                </div>
              </div>
              <div className="flight_info">
                {" "}
                <button onClick={toggle} className="details">
                  Details
                </button>
                <div className="flight_from">
                  <img
                    src={
                      "https://d1ufw0nild2mi8.cloudfront.net/images/airlines/V2/srp/result_desktop/" +
                      value.airlineCode +
                      ".png"
                    }
                    alt="airlines_code"
                    className="airlines_logo"
                  />
                  <div className="from_dep_time">
                    {" "}
                    {value.bounds[0].departure.code} <br />{" "}
                    <div className="dep_time">
                      {dep_time_from_b0.getUTCHours()}:
                      {(dep_time_from_b0.getUTCMinutes() < 10 ? "0" : "") +
                        dep_time_from_b0.getUTCMinutes()}
                    </div>
                    {dep_time_from_b0.getUTCDate()}-
                    {dep_time_from_b0.toLocaleString("en-US", {
                      month: "short",
                    })}
                    -{dep_time_from_b0.getUTCFullYear()}
                  </div>
                  <div>
                    {" "}
                    <div className="duration">{parse_b0}</div>
                    <div className="duration_line">
                      {" "}
                      <img
                        src={duration_line}
                        alt="aduration_line"
                        className="duration_line"
                      />
                    </div>
                  </div>
                  <div className="from_des_time">
                    {" "}
                    {value.bounds[0].destination.code} <br />
                    <div className="des_time">
                      {des_time_to_b0.getUTCHours()}:
                      {(des_time_to_b0.getUTCMinutes() < 10 ? "0" : "") +
                        des_time_to_b0.getUTCMinutes()}
                    </div>
                    {des_time_to_b0.getUTCDate()}-
                    {des_time_to_b0.toLocaleString("en-US", { month: "short" })}
                    -{des_time_to_b0.getUTCFullYear()} <br />
                  </div>
                </div>
                <div className="line" />
                <div className="return_flight">
                  {test && <div>A moment please...</div>}
                  <img
                    src={
                      "https://d1ufw0nild2mi8.cloudfront.net/images/airlines/V2/srp/result_desktop/" +
                      value.airlineCode +
                      ".png"
                    }
                    alt="airlines_code"
                    className="airlines_logo"
                  />
                  <div className="return_dep_time">
                    {" "}
                    {value.bounds[1]?.departure.code} <br />
                    <div className="dep_time">
                      {dep_time_from_b1.getUTCHours()}:
                      {(dep_time_from_b1.getUTCMinutes() < 10 ? "0" : "") +
                        dep_time_from_b1.getUTCMinutes()}{" "}
                    </div>
                    {dep_time_from_b0.getUTCDate()}-
                    {dep_time_from_b1.toLocaleString("en-US", {
                      month: "short",
                    })}
                    -{dep_time_from_b1.getUTCFullYear()}
                  </div>
                  <div>
                    {" "}
                    <div className="duration"> {parse_b0}</div>
                    <div className="duration_line">
                      {" "}
                      <img
                        src={duration_line}
                        alt="aduration_line"
                        className="duration_line"
                      />
                    </div>
                  </div>
                  <div className="return_des_time">
                    {" "}
                    {value.bounds[1]?.destination.code} <br />
                    <div className="des_time">
                      {des_time_to_b1.getUTCHours()}:
                      {(des_time_to_b1.getUTCMinutes() < 10 ? "0" : "") +
                        des_time_to_b1.getUTCMinutes()}{" "}
                    </div>
                    {des_time_to_b1.getUTCDate()}-
                    {des_time_to_b1.toLocaleString("en-US", { month: "short" })}
                    -{des_time_to_b1.getUTCFullYear()} <br />
                  </div>
                </div>
              </div>
            </div>
          </>
        );
      })}
    </div>
  );
};

export default Flights;
