import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { postVideogame, getGenre, getVideogames, cleanFilter, getPlatforms } from '../redux/actions/index.js';
import { useDispatch, useSelector } from 'react-redux';
import '../styles/Create.css'
const Create = () => {
    const platforms = useSelector((state) => state.platforms.sort((a, b) => {
        if (a < b) { return -1 }
        if (a > b) { return 1 };
        return 0;
    }))
    const dispatch = useDispatch();
    const history = useHistory();

    const genre = useSelector((state) => {
        state.genre.sort((a, b) => {
            if (a.name > b.name) { return 1 }
            if (a.name < b.name) { return -1 };
            return 0
        })
    });

    const [errors, setErrors] = useState({});
    const videogames = useSelector((state) => state.videogames);

    const [input, setInput] = useState({
        name: '',
        rating: 0,
        released: '',
        description: '',
        image: '',
        platforms: [],
        genre: []
    });

    useEffect(() => {
        dispatch(getGenre());
        dispatch(getPlatforms());
        dispatch(getVideogames());
        if (Validate(input)) {
            setErrors(validate(input));
        } return () => {
            dispatch(cleanFilter())
        }

    }, []);

    let pattern = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
    let reg_exImg = /.*(png|jpg|jpeg|gif)$/;

    const validate = (input) => {
        let errors = [];
        if (!input.name) {
            errors.name = 'Fill in the name';
        }
        if (input.name.lenght < 3) {
            errors.name = 'name must have at least 3 characters'
        }
        if (videogames.find((e) => e.name === input.name)) {
            errors.name = 'Name already exists';
        }
        if (input.name.lenght > 25) {
            errors.name = 'you´ve reached the limit of characters';
        }
        if (input.released.lenght === 0) {
            errors.released = 'Must fill in a date';
        }
        if (input.rating === 0) {
            errors.rating = 'Rating must be between 1 and 5'
        }
        if (input.description.lenghy < 8 || input.description.lenght > 255) {
            errors.description = 'Needs a description between 8 and 255 characters'
        }
        if (input.genre.lenght === 0) {
            errors.genre = 'Select at least a genre';
        }
        if (input.genre.lenght > 3) {
            errors.genre = 'Select up to three genres';
        }
        if (input.genre.includes(input.genre.value)) {
            errors.genre = 'genre already selected';
        }
        if (!pattern.test(input.image)) {
            if (!reg_exImg.test(input.image)) {
                errors.image = 'Link needs to end with jpeg, jpg, png, gof or bmp';
            }
        }
        return errors;
    }

    const handleInputChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
        setErrors(
            validate({
                ...input,
                [e.target.name]: e.target.value,
            })
        );
        console.log(errors.genre);
        console.log(input);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(dispatch(postVideogame(input)));
        alert('Crashed!');
        setInput({
            name: '',
            image: '',
            rating: 0,
            released: '',
            description: '',
            platforms: [],
            genre: []
        });
        history.push('/home')
    }

    const handleDelete = (e) => {
        e.preventDefault();
        setInput({
            ...input,
            genre: input.genre.filter((t) => t !== e.target.value)
        })
        setErrors(
            validate({
                ...input,
                [e.target.name]: [e.target.name]
            })
        );
        const newInput = input;
        setErrors(validate(newInput))
        console.log(errors);
    }

    const handleDeletePlatforms = (e) => {
        setInput({
            ...input,
            platforms: input.platforms.filter((t) => t !== e.target.value),
        })
    }

    const handleSelect = (e) => {
        if (!input.genre.includes(e.target.value)) {
            setInput({
                ...input,
                genre: [...input.genre, e.target.value]
            });
            setErrors(
                validate({
                    ...input,
                    genre: [...input.genre, e.target.value]
                })
            );
        }
    }

    const handleSelectPlatforms = (e) => {
        if (!input.platforms.includes(e.target.value)) {
            setInput({
                ...input,
                platforms: [...input.platforms, e.target.value]
            })
        }

    }
    return (
        <div className='master-container'>
            <div className='header-videogame'>
                <Link to='home'>
                    <button className='button-ch'>go back</button>
                </Link>
                <div className='text-videogame'>
                    Make you own VG
                </div>
            </div>
            <div className='videogame-components'>
                <form className='form'>
                    <div>
                        <input placeholder='Name' type="text" value={input.name} name='name' style={{ width: 200 }} autoComplete='off' onChange={handleInputChange} />
                    </div>
                    <div>
                        <input type="date" value={input.date} name='released' style={{ width: 200 }} autoComplete='off' onChange={handleInputChange} />
                    </div>
                    <div>
                        <input placeholder='Image' type="text" value={input.image} name='image' style={{ width: 200 }} onChange={handleInputChange} />
                    </div>
                    <div>
                        <input placeholder='Rating' type="number" value={input.rating} name='rating' style={{ width: 200 }} onChange={handleInputChange} />
                    </div>
                    <div>
                        <input placeholder='Description required, 255 characters max' type="text" value={input.description} name='description' style={{ width: 200, height: 100 }} onChange={handleInputChange} />
                    </div>

                    <label className='title-genres'>
                        <strong>Genres:</strong>{' '}
                    </label>
                    <label className='subtitle-genres'> Choose up to 3 genres</label>

                    <select onChange={handleSelect}>{genre.map((e) => {
                        <option value={e.name}> {e.name} </option>
                    })}
                    </select>

                    {input.genre.map((e) => (
                        <div>
                            <p>{e}</p> {' '}
                            <button name='genre' value={e} className='btnX' onClick={(e) => handleDelete(e)}>X</button>
                        </div>
                    ))}

                    <div>
                        <label className='title-name'>
                            <strong>Platforms:</strong> {' '}
                        </label>
                        <div id='platforms' className='platforms'>
                            <select onChange={handleSelectPlatforms}>
                                {' '}
                                {platforms.map((e) => (
                                    <option value={e}> {e} </option>
                                ))} {' '}
                            </select>
                        </div>
                        {input.platforms.map((e) => (
                            <div>
                                <p>{e}</p> {' '}
                                <button name='platforms' value={e} className='btnX' onClick={(e) => handleDeletePlatforms(e)}>X</button>
                            </div>
                        ))}
                        <br />
                    </div>
                    <div className='btn-create'>
                        <div>
                            {errors.name && (
                                <p className='errors'>{errors.name}</p>
                            )}
                            {errors.description && (
                                <p className='errors'>{errors.description}</p>
                            )}
                            {errors.image && (
                                <p className='errors'>{errors.image}</p>
                            )}
                            {errors.rating && (
                                <p className='errors'>{errors.rating}</p>
                            )}
                            {errors.released && (
                                <p className='errors'>{errors.released}</p>
                            )}
                        </div>
                    </div>
                </form>
                <div className='div-button'>
                    <br />
                    <button onClick={handleSubmit} type='submit' disabled={Object.keys(errors).length ? true : false}>
                        Create
                    </button>
                </div>
                <div className='preview-create-image'>
                    {input.image && <img src={input.image} width='300' />}
                </div>
            </div>
        </div>
    )
}

export default Create