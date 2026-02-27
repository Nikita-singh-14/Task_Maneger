import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Textbox from "../components/Textbox";
import Button from "../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { useRegisterMutation } from "../redux/slices/api/authApiSlice";
import { toast } from "sonner";
import Loading from "../components/Loading";

const Signup = () => {
    const { user } = useSelector((state) => state.auth);
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();
    const isAdmin = watch("isAdmin");

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [registerUser, { isLoading }] = useRegisterMutation();

    const submitHandler = async (data) => {
        try {
            const result = await registerUser(data).unwrap();
            toast.success("Registration successful! Please log in.");
            navigate("/log-in");
        } catch (error) {
            console.log(error);
            toast.error(error?.data?.message || error.message);
        }
    };

    useEffect(() => {
        user && navigate("/dashboard");
    }, [user]);

    return (
        <div className='w-full min-h-screen flex items-center justify-center flex-col lg:flex-row bg-[#f3f4f6]'>
            <div className='w-full md:w-auto flex gap-0 md:gap-40 flex-col md:flex-row items-center justify-center'>
                {/* left side */}
                <div className='h-full w-full lg:w-2/3 flex flex-col items-center justify-center'>
                    <div className='w-full md:max-w-lg 2xl:max-w-3xl flex flex-col items-center justify-center gap-5 md:gap-y-10 2xl:-mt-20'>
                        <span className='flex gap-1 py-1 px-3 border rounded-full text-sm md:text-base bordergray-300 text-gray-600'>
                            Join us to manage tasks effectively!
                        </span>
                        <p className='flex flex-col gap-0 md:gap-4 text-4xl md:text-6xl 2xl:text-7xl font-black text-center text-blue-700'>
                            <span>Create Your</span>
                            <span>Account</span>
                        </p>

                        <div className='cell'>
                            <div className='circle rotate-in-up-left'></div>
                        </div>
                    </div>
                </div>

                {/* right side */}
                <div className='w-full md:w-1/3 p-4 md:p-1 flex flex-col justify-center items-center'>
                    <form
                        onSubmit={handleSubmit(submitHandler)}
                        className='form-container w-full md:w-[400px] flex flex-col gap-y-6 bg-white px-10 pt-10 pb-10'
                    >
                        <div className=''>
                            <p className='text-blue-600 text-3xl font-bold text-center'>
                                Sign Up
                            </p>
                            <p className='text-center text-base text-gray-700 '>
                                Start your journey with us.
                            </p>
                        </div>

                        <div className='flex flex-col gap-y-4'>
                            <Textbox
                                placeholder='John Doe'
                                type='text'
                                name='name'
                                label='Full Name'
                                className='w-full rounded-full'
                                register={register("name", {
                                    required: "Name is required!",
                                })}
                                error={errors.name ? errors.name.message : ""}
                            />
                            <Textbox
                                placeholder='Developer'
                                type='text'
                                name='title'
                                label='Title'
                                className='w-full rounded-full'
                                register={register("title", {
                                    required: "Title is required!",
                                })}
                                error={errors.title ? errors.title.message : ""}
                            />
                            <Textbox
                                placeholder='Software Engineer'
                                type='text'
                                name='role'
                                label='Role'
                                className='w-full rounded-full'
                                register={register("role", {
                                    required: "Role is required!",
                                })}
                                error={errors.role ? errors.role.message : ""}
                            />
                            <Textbox
                                placeholder='email@example.com'
                                type='email'
                                name='email'
                                label='Email Address'
                                className='w-full rounded-full'
                                register={register("email", {
                                    required: "Email Address is required!",
                                })}
                                error={errors.email ? errors.email.message : ""}
                            />
                            <Textbox
                                placeholder='your password'
                                type='password'
                                name='password'
                                label='Password'
                                className='w-full rounded-full'
                                register={register("password", {
                                    required: "Password is required!",
                                    minLength: {
                                        value: 6,
                                        message: "Password must be at least 6 characters long."
                                    }
                                })}
                                error={errors.password ? errors.password.message : ""}
                            />

                            <div className='flex items-center gap-2'>
                                <input
                                    type="checkbox"
                                    id="isAdmin"
                                    {...register("isAdmin")}
                                    className="w-4 h-4 cursor-pointer"
                                />
                                <label htmlFor="isAdmin" className="cursor-pointer text-gray-700">Register as Admin</label>
                            </div>

                            {isAdmin && (
                                <Textbox
                                    placeholder='Enter admin secret password'
                                    type='password'
                                    name='adminPassword'
                                    label='Admin Password'
                                    className='w-full rounded-full'
                                    register={register("adminPassword", {
                                        required: "Admin password is required to register as admin!",
                                    })}
                                    error={errors.adminPassword ? errors.adminPassword.message : ""}
                                />
                            )}

                            {isLoading ? (
                                <Loading />
                            ) : (
                                <Button
                                    type='submit'
                                    label='Sign Up'
                                    className='w-full h-10 bg-blue-700 text-white rounded-full mt-2'
                                />
                            )}

                            <div className='mt-2 text-center'>
                                <span className='text-sm text-gray-500'>
                                    Already have an account?{" "}
                                    <span
                                        onClick={() => navigate("/log-in")}
                                        className='text-blue-600 hover:underline cursor-pointer'
                                    >
                                        Log In
                                    </span>
                                </span>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Signup;
