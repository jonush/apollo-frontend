import { axiosWithAuth } from "./index";

// Topic Endpoints
const topics = `${process.env.REACT_APP_API_URI}/topics`;

// fetch a topic by its ID
const getTopicByID = id => {
  return axiosWithAuth()
    .get(`${topics}/${id}`)
    .then(res => {
      return res.data;
    })
    .catch(err => {
      console.log(err);
    })
};

const getTopicByLeaderID = leaderID => {
  return axiosWithAuth()
    .get(`${topics}/leader/${leaderID}`)
    .then(res => {
      return res.data;
    })
    .catch(err => {
      console.log(err);
    })
};

const createTopic = topic => {
  return axiosWithAuth()
    .post(topics, topic)
    .then(res => {
      return res.data;
    })
    .catch(err => {
      console.log(err);
    })
};

const updateTopic = (topic, id) => {
  return axiosWithAuth()
    .put(`${topics}/${id}`, topic)
    .then(res => {
      return res.data;
    })
    .catch(err => {
      console.log(err);
    })
};

const deleteTopic = id => {
  return axiosWithAuth()
    .delete(`${topics}/${id}`)
    .then(res => {
      return res.data;
    })
    .catch(err => {
      console.log(err);
    })
};

export {
  getTopicByID,
  getTopicByLeaderID,
  createTopic,
  updateTopic,
  deleteTopic,
};