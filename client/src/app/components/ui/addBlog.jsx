import React, { useState, useEffect } from "react";
import TextField from "../common/form/textField";
import TextAreaField from "../common/form/textAreaField";
import { validator } from "../../utils/validator";
import { useDispatch, useSelector } from "react-redux";
import { createBlog } from "../../store/blog";
import BackHistoryButton from "../common/backButton";
import { getCurrentUserData, getCurrentUserId } from "../../store/users";

const AddBlog = () => {
    const [data, setData] = useState({ name: "", written: "", text: "" });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const currentUserId = useSelector(getCurrentUserId());
    const currentDataUser = useSelector(getCurrentUserData(currentUserId));
    const dispatch = useDispatch();
    useEffect(() => {
        if (data && isLoading) {
            setIsLoading(false);
        }
    }, [data]);
    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    const validatorConfig = {
        name: {
            isRequired: {
                message: "Введите название"
            }
        },
        written: {
            isRequired: {
                message: "Введите текст"
            }
        },
        text: {
            isRequired: {
                message: "Введите текст"
            }
        }
    };
    useEffect(() => {
        validate();
    }, [data]);
    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        const { name, written, text } = data;
        const newData = {
            name: name,
            written: written,
            text: text,
            userId: currentUserId,
            author: currentDataUser.name
        };
        dispatch(createBlog(newData));
    };
    const isValid = Object.keys(errors).length === 0;

    return (
        <div className="container mt-5">
            <BackHistoryButton />
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    <h1>Добавление статьи</h1>
                        <form onSubmit={handleSubmit}>
                            <TextField
                                label="Название статьи"
                                type="text"
                                name="name"
                                value={data.name}
                                onChange={handleChange}
                                error={errors.name}
                            />
                            <TextField
                                label="Короткий текст"
                                type="text"
                                name="written"
                                value={data.written}
                                onChange={handleChange}
                                error={errors.written}
                            />
                            <TextAreaField
                                label="Полный текст статьи"
                                type="text"
                                name="text"
                                value={data.text}
                                onChange={handleChange}
                                error={errors.text}
                            />
                            <button
                                className="btn btn-primary btn-lg"
                                disabled={!isValid}
                                type="submit"
                            >
                                Опубликовать
                            </button>
                        </form>
                </div>
            </div>
        </div>
    );
};

export default AddBlog;
