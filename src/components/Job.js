import React, { useCallback } from "react"; 
import { useForm } from "react-hook-form";
import { jobSchema } from "../schemas";
import { getUserDetails } from "../services/actions/actions";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

const mapStateToProps = (state) => ({
    storeData: state.userItems.userData,
  });
  
  const mapDispatchToProps = (dispatch) => ({
    userDetailsHandler: (data) => dispatch(getUserDetails(data)),
  });

  const useYupValidationResolver = (jobSchema) =>
  useCallback(
    async (data) => {
      try {
        const values = await jobSchema.validate(data, {
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
    [jobSchema]
  );

function Job(props) {
    const navigate = useNavigate();
    const resolver = useYupValidationResolver(jobSchema);
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm({ resolver });

    const onSubmit = (jobData) => {
        let newData = props.storeData;
        Object.assign(newData,{...jobData})
        props.userDetailsHandler(newData);
        navigate('/alldetails')
    };

  return (
    <div>
      <div className="container my-3">
        <h2>Job Details Form</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label htmlFor="exampleInputFullName1" className="form-label">
              Company Name
            </label>
            <input
              type="text"
              name="companyName"
              className="form-control"
              id="fullNameInputEmail1"
              {...register("companyName")}
              aria-describedby="fullNameHelp"
            />
             <p className="formError">{errors.companyName?.message}</p>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Role
            </label>
            <input
              type="text"
              name="role"
              {...register("role")}
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
             <p className="formError">{errors.role?.message}</p>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputMobile1" className="form-label">
              Company address
            </label>
            <input
              type="text"
              name="companyAddress"
              {...register("companyAddress")}
              className="form-control"
              id="mobileInputEmail1"
              aria-describedby="mobileHelp"
            />
             <p className="formError">{errors.companyAddress?.message}</p>
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Job);
