import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { educationSchema } from "../schemas";
import { getUserDetails } from "../services/actions/actions";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

const mapStateToProps = (state) => ({
  storeData: state.userItems.userData,
});

const mapDispatchToProps = (dispatch) => ({
  userDetailsHandler: (data) => dispatch(getUserDetails(data)),
});

const useYupValidationResolver = (educationSchema) =>
  useCallback(
    async (data) => {
      try {
        const values = await educationSchema.validate(data, {
          abortEarly: false,
        });

        return {
          values,
          errors: {},
        };
      } catch (errors) {
        return {
          values: {},
          errors: errors.inner.reduce(
            (allErrors, currentError) => ({
              ...allErrors,
              [currentError.path]: {
                type: currentError.type ?? "validation",
                message: currentError.message,
              },
            }),
            {}
          ),
        };
      }
    },
    [educationSchema]
  );

function Education(props) {
    console.log("props---->",props)

  const navigate = useNavigate();
  const resolver = useYupValidationResolver(educationSchema);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver });

  const onSubmit = (educationData) => {
      let newData = props.storeData;
      Object.assign(newData,{...educationData})
      props.userDetailsHandler(newData);
    navigate('/job')
  };

  return (
    <div className="container my-3">
      <h2>Education Details Form</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label htmlFor="exampleInputSchoolName1" className="form-label">
            School Name
          </label>
          <input
            type="text"
            name="schoolName"
            {...register("schoolName")}
            className="form-control"
            id="schoolNameInputEmail1"
            aria-describedby="schoolNameHelp"
          />
           <p className="formError">{errors.schoolName?.message}</p>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputCollegeName" className="form-label">
            College Name
          </label>
          <input
            type="text"
            name="collegeName"
            {...register("collegeName")}
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
           <p className="formError">{errors.collegeName?.message}</p>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputMobile1" className="form-label">
            Course Name
          </label>
          <input
            type="text"
            name="courseName"
            {...register("courseName")}
            className="form-control"
            id="mobileInputEmail1"
            aria-describedby="mobileHelp"
          />
           <p className="formError">{errors.courseName?.message}</p>
        </div>
        <button type="submit" className="btn btn-primary">
          Next
        </button>
      </form>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Education);
