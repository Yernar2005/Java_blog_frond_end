import React, {useContext, useState} from 'react';
import {useNavigate} from "react-router-dom";
import classNames from 'classnames';


import './postModal.scss';
import userIcon from '../../assets/userIcon.png'
import {Context} from "../../main.tsx";


interface PostModalProps {
    isOpen?: boolean;
    onClose?: () => void;
    onToggleFullScreen?: () => void;
    onPublish?: (title: string, body: string, image: File | null) => void;
}

const PostModal: React.FC<PostModalProps> = ({isOpen, onClose, onToggleFullScreen}) => {


    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [image, setImage] = useState<File | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [imagePreview, setImagePreview] = useState<string | null>(null);


    const navigate = useNavigate();
    const {store} = useContext(Context)

    if (isOpen === false) return null;


    const handlePublish = async () => {
        if (!body.trim()) return;
        try {

            setIsSubmitting(true);

            await store.createPost(title, body, image);


            setTitle('');
            setBody('');
            setImage(null);
            setImagePreview(null);

            if (onClose) {
                onClose();
            }

            navigate("/main")

        } catch (error) {
            console.error("Ошибка при публикации: ", error)

        } finally {
            setIsSubmitting(false);
        }
    };

    const handleClose = () => {
        if (onClose) {
            onClose();
        }
        navigate("/main")
    }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        if (file) {
            setImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            }
            reader.readAsDataURL(file);
        }
    }

    const handleRemoveImage = () => {
        setImage(null);
        setImagePreview(null);
    }

    return (
        <div className="post-modal__overlay">
            <div className="post-modal">
                <header className="post-modal__header">
                    <div className="post-modal__user">
                        <img
                            className="post-modal__avatar"
                            src={userIcon}
                            alt="avatar"
                        />
                        <div className="post-modal__userinfo">
                            <span className="post-modal__username">
                                {store.user?.username || 'Пользователь'}
                            </span>
                            <button className="post-modal__theme-btn">
                                Без темы <span className="post-modal__arrow">▾</span>
                            </button>
                        </div>
                    </div>
                    <div className="post-modal__actions">
                        <button
                            className="post-modal__icon-btn"
                            onClick={onToggleFullScreen}
                            aria-label="Toggle full screen"
                        >
                            ⛶
                        </button>
                        <button
                            className="post-modal__icon-btn"
                            onClick={handleClose}
                            aria-label="Close"
                        >
                            ✕
                        </button>
                    </div>
                </header>

                <div className="post-modal__body">
                    <input
                        type="text"
                        className="post-modal__title"
                        placeholder="Заголовок"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <textarea
                        className="post-modal__textarea"
                        placeholder="Как всем известно, труд..."
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                    />

                    {/* Блок для загрузки изображения */}
                    <div className="post-modal__image-upload">
                        <input
                            type="file"
                            id="post-image"
                            accept="image/*"
                            onChange={handleImageChange}
                            style={{display: 'none'}}
                        />

                        {!imagePreview ? (
                            <label htmlFor="post-image" className="post-modal__upload-btn">
                                <span>📷 Прикрепить фото</span>
                            </label>
                        ) : (
                            <div className="post-modal__image-preview-container">
                                <img
                                    src={imagePreview}
                                    alt="Preview"
                                    className="post-modal__image-preview"
                                />
                                <button
                                    className="post-modal__remove-image"
                                    onClick={handleRemoveImage}
                                    aria-label="Remove image"
                                >
                                    ✕
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                <footer className="post-modal__footer">
                    <button
                        className={classNames('post-modal__publish-btn', {
                            'post-modal__publish-btn--disabled': !body.trim() || isSubmitting,
                        })}
                        onClick={handlePublish}
                        disabled={!body.trim() || isSubmitting}
                    >
                        {isSubmitting ? 'Публикация...' : 'Опубликовать'}
                    </button>
                </footer>
            </div>
        </div>


    );
};


export default PostModal;