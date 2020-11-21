import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { fetchDefaultQuestions } from "../../../state/actions/fetchQuestions";
import TopicDetails from "../NewTopic/TopicDetails";
import TopicContextQ from "../NewTopic/TopicContextQ";
import TopicSurveyQ from "../NewTopic/TopicSurveyQ";
import { updateTopic } from "../../../api/topics";
import { createQuestion, updateQuestion } from "../../../api/questions";
import TopicReview from "../NewTopic/TopicReview";
import { Button, Modal, Form, Steps, message } from "antd";
import axios from "axios";

const EditTopicForm = (props) => {
  const [form] = Form.useForm();
  const [page, setPage] = useState(0);
  const [visible, setVisible] = useState(false);
  const [contextQ, setContextQ] = useState([]);
  const [surveyQ, setSurveyQ] = useState([]);

  // fetch the default topic questions created with the new topic
  useEffect(() => {
    props.fetchDefaultQuestions(props.topic.id);
    setVisible(props.edit);
  }, [props.edit]);

  // filter the questions by context and request types
  useEffect(() => {
    setContextQ(props.questions.filter(q => q.type === "context"));
    setSurveyQ(props.questions.filter(q => q.type === "request"));
  }, [props.questions])

  const editTopic = () => {
    form
      .validateFields()
      .then(values => {
        console.log(values);
        updateTopic(values.topic, props.topic.id)
          .then(() => {
            // if new questions were added
            if(values.contextQuestions.length > contextQ.length) {
              addQuestions(values, contextQ, "contextQuestions");
            }
            // if existing questions were removed 
            else if(values.contextQuestions.length < contextQ.length) {
              removeQuestions(values, contextQ, "contextQuestions");
            } 
            // if there were no existing default questions
            else if(contextQ.length === 0) {
              createQuestions(values, "contextQuestions");
            } 
            // if no questions were added or removed, only updated
            else {
              axios.all(values.contextQuestions.map(q => {
                updateQuestion(q, q.id)
              }))
            }
          })
          .then(() => {
            // if new questions were added
            if(values.surveyQuestions.length > surveyQ.length) {
              addQuestions(values, surveyQ, "surveyQuestions");
            }
            // if existing questions were removed 
            else if(values.surveyQuestions.length < surveyQ.length) {
              removeQuestions(values, surveyQ, "surveyQuestions");
            } 
            // if there were no existing default questions
            else if(surveyQ.length === 0) {
              createQuestions(values, "surveyQuestions");
            } 
            // if no questions were added or removed, only updated
            else {
              axios.all(values.surveyQuestions.map(q => {
                updateQuestion(q, q.id)
              }))
            }
          })
          .then(() => {
            cancelEdit();
            message.success("The topic was successfully updated.")
          })
          .catch(err => console.log(err))
      })
      .catch(err => {
        console.log(err)
      })
  };

  const cancelEdit = () => {
    props.setEdit(false);
  };

  // handler for updating, creating, or removing topic default context questions 
  // if new questions were added to the topic
  const addQuestions = (values, questions, type) => {
    axios.all(values[type].slice(0, questions.length).map(q => {
      updateQuestion(q, q.id);
    }))
    .then(() => {
      axios.all(values[type].slice(questions.length).map(q => {
      createQuestion({...q, topic_id: props.topic.id});
      }))
    })
    .catch(err => console.log(err))
  };
  
  // if default questions were removed from the topic 
  const removeQuestions = (values, questions, type) => {
    let savedQ = [];
    let removedQ= [];

    for(let i = 0; i < values[type].length; i++) {
      for(let j = 0; j < questions.length; j++) {
        if(values[type][i].id === questions[j].id) {
          savedQ.append(values[type][i]);
        } else {
          removedQ.append(values[type][i]);
        }
      }
    };

    // update the questions that are saved to the topic
    axios.all(savedQ.map(q => {
      updateQuestion(q, q.id)
    }))
    .then(() => {
    // remove the default type of questions removed from the topic
      axios.all(removedQ.map(q => {
        updateQuestion({...q, default: false}, q.id)
      }))
    })
  };

  // if there were no questions, create them
  const createQuestions = (values, type) => {
    axios.all(values[type].map(q => {
      createQuestion({...q, topic_id: props.topic.id})
    }))
  };

  return (
    <div>
      {
        !props.isFetching ?
          <Modal
            centered
            visible={visible}
            maskClosable={false}
            title="Edit Topic"
            width="50%"
            bodyStyle={{
              width: "70%",
              height: "60vh",
              overflow: "auto",
              overflowX: "hidden",
              margin: "0 auto",
            }}
            onOK={editTopic}
            onCancel={cancelEdit}
            footer={
              <>
                {page === 0 ? null : (
                  <Button
                    style={{ width: "15%" }}
                    type="secondary"
                    onClick={() => {
                      setPage(page - 1);
                    }}
                  >
                    Back
                  </Button>
                )}
                {page === 3 ? (
                  <Button
                    type="primary"
                    style={{ width: "30%" }}
                    onClick={editTopic}
                  >
                    Save Topic
                  </Button>
                ) : (
                  <Button
                    style={{ width: "15%" }}
                    type="primary"
                    onClick={() => {
                      setPage(page + 1);
                    }}
                  >
                    Next
                  </Button>
                )}
              </>
            }
          >
            <Steps
              className="progress-bar"
              size="small"
              current={page}
              style={{ marginBottom: "1rem" }}
            >
              <Steps.Step />
              <Steps.Step />
              <Steps.Step />
              <Steps.Step />
            </Steps>

            <Form
              form={form}
              layout="vertical"
              name="form_in_modal"
              initialValues={{
                topic: props.topic,
                contextQuestions: props.questions.filter(q => q.type === "context"),
                surveyQuestions: props.questions.filter(q => q.type === "request"),
              }}
            >
              <div className={page === 0 ? null : "closed"}>
                <TopicDetails />
              </div>

              <div className={page === 1 ? null : "closed"}>
                <TopicContextQ />
              </div>

              <div className={page === 2 ? null : "closed"}>
                <TopicSurveyQ />
              </div>

              <div className={page === 3 ? null : "closed"}>
                <TopicReview form={form} page={page} />
              </div>
            </Form>
          </Modal> : null
      }
    </div>
  );
};

const mapStateToProps = state => {
  return {
    isFetching: state.questionsList.isFetching,
    questions: state.questionsList.questions,
    errors: state.questionsList.errors
  }
};

export default connect(mapStateToProps, {fetchDefaultQuestions})(EditTopicForm);