"use client";

import { Col, Container, Nav, Row } from "react-bootstrap";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <Container fluid className="h-100">
      <Row className="h-100">
        <Col xs={1} md={2} className="border-end">
          <Nav defaultActiveKey="/" className="flex-column p-4 fs-3">
            <Nav.Link href="/">Search City</Nav.Link>
            <Nav.Link href="/favorites">Favorites</Nav.Link>
          </Nav>
        </Col>
        <Col className="pt-2">{children}</Col>
        <Col xs={0} xxl={2} className="border-start"></Col>
      </Row>
    </Container>
  );
}
