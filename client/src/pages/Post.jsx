import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import services from "../appwrite/services";
import parse from "html-react-parser";
import { useSelector } from "react-redux";


export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);
    console.log(userData)

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            services.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        services.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="py-8">
            <div className="w-[400px] ">
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                    <img
                        src={services.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className="rounded-xl"
                    />

                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <button  className="mr-3 bg-green-600 px-[16px] py-[12px]">
                                    Edit
                                </button>
                            </Link>
                            <button className=" bg-red-600 px-[16px] py-[12px]" onClick={deletePost}>
                                Delete
                            </button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>
                <div className="browser-css">
                    {parse(post.content)}
                    </div>
            </div>
        </div>
    ) : null;
}