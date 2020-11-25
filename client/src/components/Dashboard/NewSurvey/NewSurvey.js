import React, { useState, useEffect } from "react";
import { Button, Modal, Form, Steps } from "antd";
import { connect } from "react-redux";
import { fetchSurveys } from "../../../state/actions/fetchSurveys";
import SurveyContextQ from "./SurveyContextQ";
import SurveyContextR from "./SurveyContextR";
import SurveyQuestions from "./SurveyQuestions";
import SurveyReview from "./SurveyReview";
import { createSurvey } from "../../../api/surveys";
import { getDefaultQuestions } from "../../../api/questions";
import { createSurveyQuestion } from "../../../api/surveyQuestions";
import { createResponse } from "../../../api/responses";
import axios from "axios";

const NewSurvey = props => {
  const [form] = Form.useForm();
  const [page, setPage] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [contextQ, setContextQ] = useState([]);
  const [surveyQ, setSurveyQ] = useState([]);
  const [visible, setVisible] = useState(false);

  // fetch the questions for use in the new survey modal
  useEffect(() => {
    getDefaultQuestions(props.topic.id)
      .then(res => {
        setQuestions(res);
      })
      .catch(err => console.log(err))
  }, [props.updatedTopic]);

  // filter the questions for use in the new survey modal
  useEffect(() => {
    filterQuestions();
  }, [questions]);

  const filterQuestions = () => {
    let cQ = [];
    let sQ = [];

    for(let i = 0; i < questions.length; i++) {
      if(questions[i].type === "context") {
        cQ.push(questions[i]);
      } else {
        sQ.push(questions[i]);
      }
    }

    setContextQ(cQ);
    setSurveyQ(sQ);
  };

  const createNewSurvey = () => {
    form
      .validateFields()
      .then(values => {
        console.log(values);
        createSurvey(values.survey)
          .then(res => {
            console.log(res);
            getSurveyID(values, res.surveyID);
          })
          .then(() => {
            axios.all(values.contextQuestions.map(cQ => {
              createSurveyQuestion(cQ)
                .then(res => console.log(res))
                .catch(err => console.log(err))
            }))
            .then(() => {
              axios.all(values.contextResponses.map(cR=> {
                createResponse(cR)
                  .then(res => console.log(res))
                  .catch(err => console.log(err))
              }))
              .then(() => {
                axios.all(values.surveyQuestions.map(sQ => {
                  createSurveyQuestion(sQ)
                    .then(res => console.log(res))
                    .catch(err => console.log(err))
                }))
                .then(res => {
                  props.fetchSurveys(props.topic.id);
                  cancelSurvey();
                })
                .catch(err => console.log(err));
              })
              .catch(err => console.log(err));
            })
            .catch(err => console.log(err));
          })
          .catch(err => console.log(err))
      })
      .catch(err => console.log(err));
  };

  // upon selecting questions, assign the proper question id to determine if the question is new or untouched
  const getQuestionID = values => {
    for(let i = 0; i < contextQ.length; i++) {
      for(let j = 0; j < values.contextQuestions.length; j++) {
        if(contextQ[i].question === values.contextQuestions[j].question) {
          values.contextQuestions[j] = {
            ...values.contextQuestions[j],
            question_id: contextQ[i].id
          }
        }
        else {
          values.contextQuestions[j] = {
            ...values.contextQuestions[j],
            default: false,
          }
        }
      }
    }

    for(let i = 0; i < surveyQ.length; i++) {
      for(let j = 0; j < values.surveyQuestions.length; j++) {
        if(surveyQ[i].question === values.surveyQuestions[j].question) {
          values.surveyQuestions[j] = {
            ...values.surveyQuestions[j],
            question_id: surveyQ[i].id
          }
        }
        else {
          values.surveyQuestions[j] = {
            ...values.surveyQuestions[j],
            default: false,
          }
        }
      }
    }
  };

  // for all selected questions, assign the survey_id from the newly created survey
  const getSurveyID = (values, surveyID) => {
    getQuestionID(values);

    for(let i = 0; i < values.contextQuestions.length; i++) {
      values.contextQuestions[i] = {
        ...values.contextQuestions[i], 
        survey_id: surveyID,
        topic_id: props.topic.id,
      }
    }

    for(let i = 0; i < values.contextResponses.length; i++) {
      values.contextResponses[i] = {
        ...values.contextResponses[i], 
        survey_id: surveyID,
        topic_id: props.topic.id,
      }
    }

    for(let i = 0; i < values.surveyQuestions.length; i++) {
      values.surveyQuestions[i] = {
        ...values.surveyQuestions[i], 
        survey_id: surveyID,
        topic_id: props.topic.id,
      }
    }
  };

  const cancelSurvey = () => {
    form.resetFields();
    setVisible(false);
    setPage(0);
  };

  return (
    <div>
      <Button type="primary" block onClick={() => {setVisible(true)}}>New Survey</Button>
      
      <Modal
        centered
        visible={visible}
        maskClosable={false}
        title="New Survey"
        width="50%"
        bodyStyle={{
          width: "70%",
          height: "60vh",
          overflow: "auto",
          overflowX: "hidden",
          margin: "0 auto"
        }}
        onOK={createNewSurvey}
        onCancel={cancelSurvey}
        footer={
          <>
            {page === 0 ? null : (
              <Button
                style={{ width: "15%" }}
                type="secondary"
                onClick={() => {setPage(page - 1)}}
              >
                Back
              </Button>
            )}
            {page === 3 ? (
              <Button
                type="primary"
                style={{ width: "30%" }}
                onClick={createNewSurvey}
              >
                Create Survey
              </Button>
            ) : (
              <Button
                style={{ width: "15%" }}
                type="primary"
                onClick={() => {setPage(page + 1)}}
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
          initialValues={{ contextQuestions: contextQ, surveyQuestions: surveyQ }}
        >
          <div className={page === 0 ? null : "closed"}>
            <SurveyContextQ topic={props.topic} />
          </div>

          <div className={page === 1 ? null : "closed"}>
            <SurveyContextR form={form} />
          </div>

          <div className={page === 2 ? null : "closed"}>
            <SurveyQuestions topic={props.topic} />
          </div>

          <div className={page === 3 ? null : "closed"}>
            <SurveyReview form={form} page={page} />
          </div>
        </Form>
      </Modal>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    isFetching: state.surveysList.isFetching,
    surveys: state.surveysList.surveys,
    errors: state.surveysList.errors
  }
};

export default connect(mapStateToProps, {fetchSurveys})(NewSurvey);