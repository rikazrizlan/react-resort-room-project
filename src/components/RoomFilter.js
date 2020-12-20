import React from 'react'
import {useContext} from 'react' // the newest way to use context, as the component is a functional one
import {RoomContext} from '../context'
import Title from '../components/Title'

//get all unique values
const getUnique = (items, value) => {
    return [...new Set(items.map(item => item[value]))]
}
export default function RoomFilter({rooms}) {
    const context = useContext(RoomContext);
    //lets get what we need from the context
    const {handleChange, type, capacity, price, maxPrice, minPrice, maxSize, minSize, pets, breakfast} = context;

    //get unique types
    let types = getUnique(rooms, 'type');
    // add all
    types = ['all', ...types];

    //map to jsx
    types = types.map((item, index) => {
        return <option value={item} key={index}>{item}</option>
    })

    //get unique capacity
    let people = getUnique(rooms, 'capacity');
    //map to jsx
    people = people.map((item, index) => {
        return <option key={index} value={item}>{item}</option>
    })
    return (
        <section className="filter-container">
            <Title title="search rooms" />
            <form className="filter-form">
                <div className="form-group">
                    <label htmlFor="type">room type</label>
                    <select className="form-control" name="type" id="type" value={type} onChange={handleChange}>
                        {types}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="capacity">guests</label>
                    <select className="form-control" name="capacity" id="capacity" value={capacity} onChange={handleChange}>
                        {people}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="price">
                        room price ${price}
                    </label>
                    <input type="range" name="price" min={minPrice} max={maxPrice} id="price" value={price} onChange={handleChange} className="form-control" />
                </div>

                <div className="form-group">
                    <label htmlFor="size">room size</label>
                    <div className="size-inputs">
                        <input type="number" name="minSize" id="size" value={minSize} onChange={handleChange} className="size-input" />
                        <input type="number" name="maxSize" id="size" value={maxSize} onChange={handleChange} className="size-input" />
                    </div>
                </div>

                <div className="form-group">
                    <div className="single-extra">
                        <input type="checkbox" name="breakfast" id="breakfast" checked={breakfast} onChange={handleChange} />
                        <label htmlFor="breakfast">breakfast</label>
                    </div>
                    <div className="single-extra">
                        <input type="checkbox" name="pets" id="pets" checked={pets} onChange={handleChange} />
                        <label htmlFor="pets">pets</label>
                    </div>
                </div>
            </form>
        </section>

    )
}
