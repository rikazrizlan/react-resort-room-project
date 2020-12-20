import React from 'react';
import defaultBcg from '../images/room-1.jpeg';
import Hero from '../components/Hero';
import Banner from '../components/Banner';
import {Link} from 'react-router-dom';
import {RoomContext} from '../context';
import StyledHero from '../components/StyledHero';

class SingleRoom  extends React.Component {
    constructor(props) {
        super(props)
        //console.log(this.props);
        this.state = {
            slug: this.props.match.params.slug, //access the slug property from the passed props, slug will be unique to each room
            defaultBcg //also can be written as defaultBcg: defaultBcg
        };
    }
    static contextType = RoomContext;
    //componentDidMount() {}
    render() {
        const {getRoom} = this.context;
        const room = getRoom(this.state.slug); //we need to pass the slug property which is in the state
        
        if(!room) { //if room is undefined
            return (
                <div className="error">
                    <h3>room not found</h3>
                    <Link to="/rooms" className="btn-primary">Back To Rooms</Link>
                </div>
            ); 
        }
        const {name, description, capacity, size, price, extras, breakfast, pets, images} = room;
        //could use this line of code if i don't want to display the main image again inside the single-room-images 
        //const [mainImage,...defaultImg] = images; //de-structuring an array, used the rest opeartor to get the rest of the images

        return(
            <div>
                <StyledHero img={images[0] || this.state.defaultBcg}> 
                    <Banner title={`${name} room`}>
                        <Link to="/rooms" className="btn-primary">
                            back to rooms
                        </Link>
                    </Banner>
                </StyledHero>
                <section className="single-room">
                    <div className="single-room-images">
                        {images.map((item, index) => {
                            return <img key={index} src={item} alt={name} />
                        })}
                    </div>
                    <div className="single-room-info">
                        <article className="desc">
                            <h3>details</h3>
                            <p>{description}</p>
                        </article>
                        <article className="info">
                            <h3>info</h3>
                            <h6>price : ${price}</h6>
                            <h6>size : {size}SQFT</h6>
                            <h6>
                                max capacity : {
                                    capacity > 1? `${capacity} people` : `${capacity} person` //we use template literals inside ternary operators when we need to access an object value
                                }
                            </h6>
                            <h6>
                                {pets? "pets allowed" : "no pets allowed"}
                            </h6>
                            <h6>
                                {breakfast && "free breakfast included"}
                            </h6>
                        </article>
                    </div>
                </section>
                <section className="room-extras">
                    <h6>ectras</h6>
                    <ul className="extras">
                        {extras.map((item, index) => {
                            return <li key={index}>- {item}</li>
                        })}
                    </ul>
                </section>
            </div>
        )
    }
}

export default SingleRoom