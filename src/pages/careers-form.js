import Layout from "./../components/Layout";
import React from "react";
import LetsWork from "./../components/LetsWork";
import Common from "./../components/Common";
import Head from "next/head";
import Typography from "@mui/material/Typography";
import BasicFormControl from "../components/CareerForm";

const careersForm = () => {
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
            color: "White",
            fontSize: 40,
            marginLeft: {
              xs: "20px",
              sm: "175px",
              md: "280px",
              lg: "480px",
            },
          }}
        >
          Personal Information
        </Typography>
        {/* <Common 
            
            includingImage="true"
        />  */}
        <BasicFormControl />
        <LetsWork />
      </Layout>
    </>
  );
};

export default careersForm;
