import React from "react";
import { Link } from "react-router-dom";
import millify from "millify";
import { Typography, Col, Row, Statistic } from "antd";
import { Cryptocurrencies, News } from "../components";
import { useGetCryptosQuery } from "../services/cryptoApi";
import Loader from './Loader';
const { Title } = Typography;

const Homepage = () => {
  const { data, isFetching } = useGetCryptosQuery(10);
  const globalStats = data?.data?.stats;

  if (isFetching)  return <Loader />;

  const totalStats = [
    { span: 12, title: "Total Cryptocurrencies", value: globalStats.total },
    {
      span: 12,
      title: "Total Exchanges",
      value: millify(globalStats.totalExchanges),
    },
    {
      span: 12,
      title: "Total Market Cap",
      value: millify(globalStats.totalMarketCap),
    },
    {
      span: 12,
      title: "Total 24h Volume",
      value: millify(globalStats.total24hVolume),
    },
    {
      span: 12,
      title: "Total Markets",
      value: millify(globalStats.totalMarkets),
    },
  ];

  return (
    <>
      <Title level={2} className="heading">
        Global Crypto Stats
      </Title>
      <Row>
        {totalStats?.map((item, index) => {
          return (
            <Col span={item.span} key={index}>
              <Statistic title={item.title} value={item.value} />
            </Col>
          );
        })}
      </Row>
      <div className="home-heading-container">
        <Title level={2} className="home-title">
          Top 10 Cryptocurrencies in the world
        </Title>
        <Title level={3} className="show-more">
          <Link to="/cryptocurrencies">Show More</Link>
        </Title>
      </div>
      <Cryptocurrencies simplified />
      <div className="home-heading-container">
        <Title level={2} className="home-title">
          Latest Crypto News
        </Title>
        <Title level={3} className="show-more">
          <Link to="/news">Show More</Link>
        </Title>
      </div>
      <News simplified />
    </>
  );
};

export default Homepage;
