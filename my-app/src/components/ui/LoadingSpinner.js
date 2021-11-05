import { Card, Col, Row } from 'antd';
import classes from './LoadingSpinner.module.css';

const LoadingSpinner = () => {
  return (
  <Card>
    <Row justify="center">
      <Col><div className={classes.spinner}></div></Col>
    </Row>
  </Card>
  )
  ;
}

export default LoadingSpinner;
