import { gql, useQuery, useMutation } from "@apollo/client";
import React, { useEffect } from "react";
import { Card } from "react-bootstrap";
import like from "../assets/image/like.png";
import likeFill from "../assets/image/likeFill.png";
import userAvatar from "../assets/image/user.png";
import { imgURL } from "../config";
import loader from "../assets/image/loader.gif";
import "./index.css";

const GET_ALL_IMAGE = gql`
  query getAlluserImage($id: ID!) {
    getAllUserImage(id: $id) {
      image
      username
      _id
      userId
      count
    }
  }
`;
const POST_LIKE = gql`
  mutation updateLikeDislike($userId: ID!, $imageId: ID!) {
    updateLikeDislike(userId: $userId, imageId: $imageId) {
      message
    }
  }
`;

const OtherFeed = () => {
  const userDetail = JSON.parse(localStorage.getItem("userDetail"));
  const { loading, error, data, refetch, networkStatus } = useQuery(
    GET_ALL_IMAGE,
    {
      variables: { id: userDetail.id },
    }
  );
  const [updateLikeDislike] = useMutation(POST_LIKE, {
    onCompleted(data) {
      alert(data.updateLikeDislike.message);
      refetch();
    },
  });

  useEffect(() => {
    refetch();
  }, []);

  const likeDislike = (imageId, userId) => {
    updateLikeDislike({
      variables: {
        imageId: imageId,
        userId: userDetail.id,
      },
    });
  };

  return (
    <div className="container mt-4">
      {loading ? (
        <div className="text-center">
          <img src={loader} style={{ width: "30%" }} />
        </div>
      ) : (
        <div className="row gy-5" style={{ marginLeft: "2%" }}>
          {data && data.getAllUserImage?.length > 0 ? (
            data.getAllUserImage.map((val, i) => (
              <div className="col-4" key={i}>
                <div className="card rounded">
                  <img
                    src={`${imgURL}${val.image}`}
                    height={250}
                    className="rounded-top card-img-top"
                    alt="..."
                  />
                  <div className="card-body">
                    <div className="d-flex align-items-center gap-3">
                      <img
                        src={userAvatar}
                        alt=""
                        style={{
                          width: "50px",
                          height: "50px",
                          background: "#dedede",
                          borderRadius: "50%",
                          border: "1px solid #dedede",
                          boxShadow: "0 0 6px #dedece",
                        }}
                      />
                      <p className="text-capitalize">{val.username}</p>
                    </div>

                    <div className="d-flex align-items-center fs-5 gap-2  mt-3">
                      <img
                        alt="button"
                        width={25}
                        style={{ cursor: "pointer" }}
                        onClick={() => likeDislike(val._id, val.userId)}
                        src={
                          val.count.includes(userDetail.id) ? likeFill : like
                        }
                      />
                      {val?.count?.length}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center" style={{marginTop: '10%'}}><p style={{ fontSize:'20px', fontWeight:'400'}}> No Record Found</p></div>
          )}
        </div>
      )}
    </div>
  );
};

export default OtherFeed;
