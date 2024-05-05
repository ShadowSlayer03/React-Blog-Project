import React, { useCallback, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, Select, RealTextEditor } from "../../components";
import appwriteService from "../../appwrite/appwriteConfig";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Toast from "../Toast";

const PostForm = ({ post }) => {
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const [error, setError] = useState("");

  /* watch is used to watch for changes to specific form fields
     and get its current value by watch("fieldName"). */
  // setValue to set a value to form fields by setValue("fieldName","updatedValue")
  // getValues is used to get all the form values as an object.

  // ** In post prop, if value is present then we're trying to update a post
  // If no value is present, we're trying to create a new post **
  const { register, handleSubmit, watch, setValue, getValues } = useForm({
    defaultValues: {
      title: post?.title || "",
      slug: post?.slug || "",
      content: post?.content || "",
      status: post?.status || "active",
    },
  });

  // Works for both creating and updating a post.
  // data is a parameter that is available by default to the callback fn passed to handleSubmit(react-hook-form)
  const submit = async (data) => {
    if (post) {
      const file = data.image[0]
        ? await appwriteService.uploadFile(data.image[0])
        : null;

      if (file) {
        appwriteService.deleteFile(post.featuredImage);
      }
      const dbPost = await appwriteService.updatePost({
        slug: post.$id,
        ...data,
        featuredImage: file ? file.$id : undefined,
      });

      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      } else {
        console.log("Error: Could Not Update Post!");
        setError("Error: Could Not Update Post!");
      }
    }

    else {
      const file = data.image[0]
        ? await appwriteService.uploadFile(data.image[0])
        : null;

      const dbPost = await appwriteService.createPost({
        ...data,
        featuredImage: file ? file.$id : undefined,
        userID: userData.$id,
      });

      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      } else {
        console.log("Error: Could Not Create Post!");
        setError("Error: Could Not Create Post!");
      }
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim() // Remove any leading or trailing whitespace
        .toLowerCase() // Convert the string to lowercase
        .replace(/^[a-zA-Z\d\s]+/g, "-") // Replace leading letters, digits, or whitespace with a hyphen
        .replace(/\s/g, "-"); // Replace all remaining whitespace characters with a hyphen

    return "";
  }, []);

  // **Interview Question on how to optimise useEffect**
  // useEffect gives a return statement that can be used for cleanup
  // if the function used inside the useEffect provides a way to unsubscribe or destroy itself
  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title, { shouldValidate: true }));
      }
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [watch, slugTransform, setValue]);

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      <div className="w-2/3 px-2">
        <Input
          label="Title :"
          placeholder="Title"
          className="mb-4"
          {...register("title", { required: true })}
        />
        <Input
          label="Slug :"
          placeholder="Slug"
          className="mb-4"
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            });
          }}
        />
        <RealTextEditor
          label="Content :"
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>
      <div className="w-1/3 px-2">
        <Input
          label="Featured Image :"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
        />
        {post && (
          <div className="w-full mb-4">
            <img
              src={appwriteService.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="rounded-lg"
            />
          </div>
        )}
        <Select
          options={["active", "inactive"]}
          label="Status"
          className="mb-4"
          {...register("status", { required: true })}
        />
        <Button
          type="submit"
          bgColor={post ? "bg-green-500" : undefined}
          className="w-full"
        >
          {post ? "Update" : "Submit"}
        </Button>
      </div>
      {error? <Toast errorMesg={error} /> : <></>}
    </form>
  );
};

export default PostForm;
