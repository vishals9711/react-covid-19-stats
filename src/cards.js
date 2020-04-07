import React from "react";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Cards(props) {
  // render() {
  return (
    <div >
      <Container>
        <h2>{props.country}</h2>
        <Row>
          <Col>
            <Card bg="light" text="dark">
              <Card.Body>
                <Card.Title>Confirmed Cases</Card.Title>
                <Card.Text>{props.confirm}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card bg="primary" border="primary" text="light">
              {/* <Card.Header as="h5">Featured</Card.Header> */}
              <Card.Body>
                <Card.Title>Active Cases</Card.Title>
                <Card.Text>{props.active}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card bg="success" text="light">
              {/* <Card.Header as="h5">Featured</Card.Header> */}
              <Card.Body>
                <Card.Title>Recovered Cases</Card.Title>
                <Card.Text>{props.recovered}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card bg="danger" text="light">
              {/* <Card.Header as="h5">Featured</Card.Header> */}
              <Card.Body>
                <Card.Title>Deceased Cases</Card.Title>
                <Card.Text>{props.deceased}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
  // }
}

export default Cards;
