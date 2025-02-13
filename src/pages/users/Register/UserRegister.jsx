import { Formik } from "formik";
import { userRegister } from "../../../Api/userAuth";

function UserRegister() {
  const initialValues = {
    fullname: "",
    username: "",
    email: "",
    password: "",
    image: null,
    bio: "",
    age: "",
    number: "",
    gender: "",
  };
  const hundleSubmit = async (values, { setSubmitting }) => {
    try {
      const data = await userRegister(
        values.fullname,
        values.username,
        values.email,
        values.password,
        values.image,
        values.bio,
        values.age,
        values.number,
        values.gender
      );
      console.log(data);
    } catch (error) {
      console.log("User Register", error);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <div>
      <div className="container mx-auto px-2">
        <div className="w-[1432px] bg-[#999999] opacity-20 ">
          <div>
            <h2>Create an account</h2>
            <Formik
              initialValues={initialValues}
              onSubmit={hundleSubmit}
            >
            
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserRegister;
