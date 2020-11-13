import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchSurveys } from "../../state/actions/fetchSurveys";
import { Form, Select } from "antd";
import Moment from "react-moment";

const SurveysList = props => {
  const [form] = Form.useForm();
  const { Option } = Select;

  useEffect(() => {
    props.fetchSurveys(props.topic.id);
    form.resetFields();
  }, [props.topic.id])

  // filtering through list of surveys to display the selected one
  const selectSurvey = surveyID => {
    let mainSurvey = props.surveys.filter(s => s.id === surveyID)[0];
    props.viewSurvey(mainSurvey);
  };

  return (
    <div>
      <Form name="survey_select" form={form}>
        <Form.Item name="survey_date">
          <Select
            onSelect={(s) => {selectSurvey(s)}}
            className="survey-dropdown"
            placeholder="Select a survey"
          >
            {props.surveys ? props.surveys.map((survey, index) => {
              return (
                <Option key={index} value={survey.id}>
                  <Moment date={survey.created_at} format="LL" />
                </Option>
              )
            }) : null}
          </Select>
        </Form.Item>
      </Form>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    isFetching: state.surveysList.isFetching,
    surveys: state.surveysList.surveys,
    errors: state.surveysList.errors,
  }
};

export default connect(mapStateToProps, {fetchSurveys})(SurveysList);