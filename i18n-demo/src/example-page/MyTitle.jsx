import { Col, Row } from "antd";
import { useTranslation } from "react-i18next";
import { getGreetText } from "../util/util";
export default function MyTitle() {
  const { t } = useTranslation();
  return (
    <Row>
      <Col>
        {/* 没有翻译资源的文本 */}
        <h1>{t('noTranslation')}</h1>
        <h2>{t('title')}</h2>
        <h3>{t('title-sub')}</h3>
      </Col>
      <Col>
        {getGreetText()}
      </Col>
    </Row>
  )
}
