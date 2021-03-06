import { axiosWithAuth } from "./index";

// Topic Endpoints
const topicMembers = `${process.env.REACT_APP_API_URI}/topic-members`;

// fetch all topic members
const getTopicMembers = () => {
  return axiosWithAuth()
    .get(topicMembers)
    .then(res => {
      return res.data;
    })
    .catch(err => {
      console.log(err);
    })
};

// fetch a topic member by their ID
const getMemberByID = id => {
  return axiosWithAuth()
    .get(`${topicMembers}/${id}`)
    .then(res => {
      return res.data;
    })
    .catch(err => {
      console.log(err);
    })
};

const addMember = member => {
  return axiosWithAuth()
    .post(topicMembers, member)
    .then(res => {
      return res.data;
    })
    .catch(err => {
      console.log(err);
    })
};

const updateMember = (member, id) => {
  return axiosWithAuth()
    .put(`${topicMembers}/${id}`, member)
    .then(res => {
      return res.data;
    })
    .catch(err => {
      console.log(err);
    })
};

const deleteMember = id => {
  return axiosWithAuth()
    .delete(`${topicMembers}/${id}`)
    .then(res => {
      return res.data;
    })
    .catch(err => {
      console.log(err);
    })
};

export {
  getTopicMembers,
  getMemberByID,
  addMember,
  updateMember,
  deleteMember,
};