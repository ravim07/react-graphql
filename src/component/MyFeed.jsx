import { gql, useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import like from "../assets/image/thumb-up.png";
import { imgURL } from "../config";
import loader from "../assets/image/loader.gif";

import "./index.css";

const POST_IMAGE = gql`
  mutation singleUpload($id: String!, $file: Upload!, $username: String!) {
    singleUpload(file: { id: $id, file: $file, username: $username }) {
      message
    }
  }
`;
const GET_USER_IMAGE = gql`
  query userImages($id: ID!) {
    getSingleUserFile(id: $id) {
      image
      username
      count
    }
  }
`;

const MyFeed = () => {
  const [image, setImage] = useState();
  // const [blogForm, setBlogForm] = useState({
  //   blogName: "",
  //   description: "",
  //   img: "",
  // });
  const userDetail = JSON.parse(localStorage.getItem("userDetail"));
  const { data, loading, refetch } = useQuery(GET_USER_IMAGE, {
    variables: { id: userDetail.id },
  });
  const [singleUpload] = useMutation(POST_IMAGE, {
    onCompleted(data) {
      alert(data.singleUpload.message);
      refetch();
      document.getElementById("img").value = "";
    },
    onError(error) {
      alert(error.message);
    },
  });

  const submitImage = () => {
    singleUpload({
      variables: {
        id: userDetail.id,
        file: image,
        username: userDetail.username,
      },
    });
  };

  // const handleChange = (e) => {
  //   console.log(e, "handle log");
  // };

  const uploadImage = (e) => {
    if (!e.target.files[0].name.match(/\.(jpg|jpeg|png|webp|jfif )$/)) {
      alert("Please upload vaild format image(jpg,jpeg,png,webp)");
      document.getElementById("img").value = "";
    } else {
      setImage(e.target.files[0]);
    }
  };

  return (
    <div>
      <div className="ms-4 mt-4 text-center">
        
        <input
          className="iconUpload"
          type="file"
          id="img"
          name="icon"
          accept="image/*"
          onChange={(e) => uploadImage(e)}
        />
        <Button
          className="btn btn-primary ms-2"
          onClick={submitImage}
          disabled={!image}
        >
          Upload
        </Button>
      </div>
      {/* <div className="mt-4 d-flex justify-content-center">
        <form className="card p-4 w-md-100 w-lg-75 w-50">
          <h1 className="text-center my-2">Post your blog</h1>
          <div className="row">
            <div className="col-6">
              <div className="form-group p-2">
                <label className="blog-label" for="exampleFormControlInput1">
                  Image
                </label>
                <input
                  className="iconUpload form-control"
                  type="file"
                  id="img"
                  name="icon"
                  accept="image/*"
                  onChange={(e) => uploadImage(e)}
                />
              </div>
            </div>
            <div className="col-6">
              <div className="form-group p-2">
                <label className="blog-label" for="exampleFormControlInput1">
                  Name
                </label>
                <input
                  type="text"
                  class="form-control iconUpload"
                  id="exampleFormControlInput1"
                  placeholder="name@example.com"
                />
              </div>
            </div>
          </div>
          <div className="form-group p-2">
            <label className="blog-label" for="exampleFormControlTextarea1">
              Description
            </label>
            <textarea
              class="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
            ></textarea>
          </div>
          <div className="form-group p-2">
            <Button
              className="btn btn-primary ms-2"
              onClick={submitImage}
              disabled={!image}
            >
              Upload
            </Button>
          </div>
        </form>
      </div> */}
      <div className="container mt-4">
        {loading ? (
          <div className="text-center">
            <img src={loader} style={{ width: "30%" }} alt='' />
          </div>
        ) : (
          <div className="row gy-5">
            {data && data.getSingleUserFile?.length > 0 ? (
              data.getSingleUserFile.map((val, i) => (
                <div className="col-4" key={i}>
                  <div className="card rounded">
                    <img
                      src={`${imgURL}${val.image}`}
                      style={{ objectFit: "cover" }}
                      className="rounded-top card-img-top object-cover"
                      alt="..."
                      height={250}
                    />
                    <div className="card-body">
                      <div className="d-flex align-items-center fs-5 gap-2  mt-3">
                        <img alt="button" width={20} src={like} />
                        {val?.count?.length}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center" style={{ marginTop: "10%" }}>
                <p style={{ fontSize: "20px", fontWeight: "400" }}>
                  {" "}
                  No Record Found
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyFeed;
