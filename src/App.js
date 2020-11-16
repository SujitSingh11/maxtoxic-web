import React, { useState } from "react";
import axios from "axios";
import "./App.css";

import {
  Col,
  Container,
  Row,
  Form,
  Table,
  Button,
  Spinner,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";

const api = axios.create({
  baseURL: "http://35.188.66.210",
});

const App = () => {
  const [comment, setComment] = useState("");
  const [prediction, setPrediction] = useState({});

  const [loading, setLoading] = useState(false);

  const analyze = async (textPredict) => {
    setLoading(true);
    const url = "/model/predict";
    const data = {
      text: [textPredict],
    };
    const options = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      },
    };
    api
      .post(url, data, options)
      .then((response) => {
        setPrediction(response.data.results[0].predictions);
        console.log(response.data.results[0].predictions);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  return (
    <Container>
      <Row>
        <Col sm={12} xs={12} md={12} lg={12} className="headerRoot">
          <h1 className="header">MaxToxic</h1>
          <div className={prediction.toxic >= 0.9 ? "lineRed" : "lineGreen"} />
        </Col>
        <Col sm={12} xs={12} md={12} lg={12}>
          <Form.Group controlId="maxtoxic-textarea">
            <Form.Label className="textareaLable">Enter Comment</Form.Label>

            {loading ? (
              <>
                <Form.Control as="textarea" rows={4} disabled />
                <Button className="buttonAnalyze" disabled>
                  <Spinner animation="grow" variant="light" size="sm" />
                </Button>
              </>
            ) : (
              <>
                <Form.Control
                  onChange={(e) => {
                    setComment(e.target.value);
                  }}
                  as="textarea"
                  rows={4}
                />
                <Button
                  onClick={() => analyze(comment)}
                  className="buttonAnalyze"
                >
                  Analyze
                </Button>
              </>
            )}
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col>
          <Table hover bordered size="sm" className="tablePredict center">
            <thead>
              <tr>
                <th>Type</th>
                <th>Prediction</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Toxicity</td>
                <td>
                  {prediction.toxic >= 0.9 ? (
                    <FontAwesomeIcon
                      icon={faCheckCircle}
                      className="tickIcon"
                      size="lg"
                    />
                  ) : (
                    <FontAwesomeIcon icon={faTimesCircle} size="lg" />
                  )}{" "}
                  - {(prediction.toxic * 100).toFixed(2)}%
                </td>
              </tr>
              <tr>
                <td>Severe Toxic</td>
                <td>
                  {prediction.severe_toxic >= 0.9 ? (
                    <FontAwesomeIcon
                      icon={faCheckCircle}
                      className="tickIcon"
                      size="lg"
                    />
                  ) : (
                    <FontAwesomeIcon icon={faTimesCircle} size="lg" />
                  )}{" "}
                  - {(prediction.severe_toxic * 100).toFixed(2)}%
                </td>
              </tr>
              <tr>
                <td>Obscene</td>
                <td>
                  {prediction.obscene >= 0.9 ? (
                    <FontAwesomeIcon
                      icon={faCheckCircle}
                      className="tickIcon"
                      size="lg"
                    />
                  ) : (
                    <FontAwesomeIcon icon={faTimesCircle} size="lg" />
                  )}{" "}
                  - {(prediction.obscene * 100).toFixed(2)}%
                </td>
              </tr>
              <tr>
                <td>Threat</td>
                <td>
                  {prediction.threat >= 0.9 ? (
                    <FontAwesomeIcon
                      icon={faCheckCircle}
                      className="tickIcon"
                      size="lg"
                    />
                  ) : (
                    <FontAwesomeIcon icon={faTimesCircle} size="lg" />
                  )}{" "}
                  - {(prediction.threat * 100).toFixed(2)}%
                </td>
              </tr>
              <tr>
                <td>Insult</td>
                <td>
                  {prediction.insult >= 0.9 ? (
                    <FontAwesomeIcon
                      icon={faCheckCircle}
                      className="tickIcon"
                      size="lg"
                    />
                  ) : (
                    <FontAwesomeIcon icon={faTimesCircle} size="lg" />
                  )}{" "}
                  - {(prediction.insult * 100).toFixed(2)}%
                </td>
              </tr>
              <tr>
                <td>Identity Hate</td>
                <td>
                  {prediction.identity_hate >= 0.9 ? (
                    <FontAwesomeIcon
                      icon={faCheckCircle}
                      className="tickIcon"
                      size="lg"
                    />
                  ) : (
                    <FontAwesomeIcon icon={faTimesCircle} size="lg" />
                  )}{" "}
                  - {(prediction.identity_hate * 100).toFixed(2)}%
                </td>
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default App;
