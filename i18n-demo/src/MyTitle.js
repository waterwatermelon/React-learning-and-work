import { Col, Row } from "antd";
import { useTranslation } from "react-i18next"
import { getGreetText } from "./util/util";
export default function MyTitle() {
  const { t } = useTranslation();
  return (
    <Row>
      <Col>
        <h1>{t('title')}</h1>
      </Col>
      <Col>
        {getGreetText()}
      </Col>
    </Row>
  )
}
