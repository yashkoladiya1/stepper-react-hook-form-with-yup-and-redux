import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { profileSchema } from "../schemas";
import { useNavigate } from "react-router-dom";
import { getUserDetails } from "../services/actions/actions";
import { connect } from "react-redux";

const mapStateToProps = (state) => ({
  storeData: state.userItems.userData,
});

const mapDispatchToProps = (dispatch) => ({
  userDetailsHandler: (data) => dispatch(getUserDetails(data)),
});

const useYupValidationResolver = (profileSchema) =>
  useCallback(
    async (data) => {
      try {
        const values = await profileSchema.validate(data, {
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
    [profileSchema]
  );

function Personal(props) {
  const navigate = useNavigate();
  const resolver = useYupValidationResolver(profileSchema);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver });

  const onSubmit = (personalData) => {
    props.userDetailsHandler(personalData);
    navigate("/education");
  };
  return (
    <div className="container my-3">
      <h2>Personal Details Form</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label htmlFor="exampleInputFullName1" className="form-label">
            Full Name
          </label>
          <input
            type="text"
            name="fullName"
            {...register("fullName")}
            className="form-control"
            id="fullNameInputEmail1"
            aria-describedby="fullNameHelp"
          />
          <p className="formError">{errors.fullName?.message}</p>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="text"
            name="email"
            {...register("email")}
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
          <p className="formError">{errors.email?.message}</p>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputMobile1" className="form-label">
            Mobile
          </label>
          <input
            type="text"
            name="mobile"
            {...register("mobile")}
            className="form-control"
            id="mobileInputEmail1"
            aria-describedby="mobileHelp"
          />
          <p className="formError">{errors.mobile?.message}</p>
        </div>
        <button type="sumbit" className="btn btn-primary">
          Next
        </button>
      </form>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Personal);
