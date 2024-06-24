import Layout from "./../components/Layout";
import React from "react";
import LetsWork from "./../components/LetsWork";
import Common from "./../components/Common";
import Head from "next/head";
import CareersGrid from "../components/GridCareers";
import Typography from "@mui/material/Typography";
const careers = () => {
  return (
    <>
      <Head>
        <title>Careers - 360XpertsSolutions</title>
        <meta
          name="description"
          hreflang="en"
          content="Your custom meta description goes here."
        />
      </Head>

      <Layout>
        <Typography
          sx={{
            fontSize: 48,
            color: "white",
            marginTop: "200px",
            paddingLeft: { xs: "58px", sm: "115px", md: "155px", lg: "210px" },
            fontWeight: "100",
          }}
          color="text.secondary"
          gutterBottom
        >
          Careers
        </Typography>
        <Typography
          sx={{
            fontSize: 24,
            color: "white",
            paddingLeft: { xs: "58px", sm: "120px", md: "155px", lg: "210px" },
          }}
          color="text.secondary"
          gutterBottom
        >
          Join us!
        </Typography>

        <CareersGrid />

        <LetsWork />
      </Layout>
    </>
  );
};

export default careers;
