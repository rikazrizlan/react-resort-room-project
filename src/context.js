import React, { Component } from 'react';
//import items from './data';
import Client from './Contentful';

const RoomContext = React.createContext();

class RoomProvider extends Component {
    state = {
      rooms: [],
      sortedRooms: [],
      featuredRooms: [],
      loading: true,
      type: 'all',
      capacity: 1,
      price: 0,
      minPrice: 0,
      maxPrice: 0,
      minSize: 0,
      maxSize: false,
      pets: false,
      breakfast: false
    };
    
    //getData from contentful
    getData = async () => {
        try {
            let response = await Client.getEntries({
                content_type: "beachResortRoom",
                order: "sys.createdAt"
            });
            let rooms = this.formatData(response.items);
            let featuredRooms = rooms.filter(room => room.featured === true);
            let maxPrice = Math.max(...rooms.map(item => item.price));
            let maxSize = Math.max(...rooms.map(item => item.size));

            this.setState({
                rooms: rooms,
                featuredRooms: featuredRooms,
                sortedRooms: rooms,
                loading: false,
                maxPrice,
                price: maxPrice,
                maxSize
            })
        } catch (error) {
            console.log(error);
        }
    }

    componentDidMount() {
        this.getData();
        /* will be useful if getting local data
        let rooms = this.formatData(items);
        let featuredRooms = rooms.filter(room => room.featured === true);
        let maxPrice = Math.max(...rooms.map(item => item.price));
        let maxSize = Math.max(...rooms.map(item => item.size));

        this.setState({
            rooms: rooms,
            featuredRooms: featuredRooms,
            sortedRooms: rooms,
            loading: false,
            maxPrice,
            price: maxPrice,
            maxSize
        })
        */
    }
    
    formatData(items) {
        let tempItems = items.map(item => {
            let id = item.sys.id;
            let images = item.fields.images.map(image => image.fields.file.url);

            let room = {...item.fields,images,id} //copying the properties from the fields object using javascript spread operator
            return room;
        })
        return tempItems;
    }

    //getRoom is the function that we would need to get a singlRoom page that has the properties related to the one we clicked in the home page
    getRoom = (slug) =>{
        let tempRooms = [...this.state.rooms]; //copy all the data from the rooms using the spread operator
        const room = tempRooms.find((room) => room.slug === slug); //find the room which has the slug that matches the passed in slug
        return room;
    };

    handleChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox'? target.checked : target.value;
        const name = event.target.name;
        this.setState({
            [name]:value
        }, this.filterRooms)
    };

    filterRooms = () => {
        //get all the necessary things from the state to work with the filter function
        let {rooms, type, capacity, price, minSize, maxSize, breakfast, pets} = this.state;

        //all the rooms
        let tempRooms = [...rooms];

        //transform value string to integer
        capacity = parseInt(capacity);
        price = parseInt(price);

        //filter by type
        if(type !== 'all') {
            tempRooms = tempRooms.filter(room => room.type === type)
        }

        //filter by capacity
        if(capacity !== 1) {
            tempRooms = tempRooms.filter(room => room.capacity >= capacity)
        }

        //filter by price
        if(price !== 600) {
            tempRooms = tempRooms.filter(room => room.price <= price)
        }

        //filter by size
        tempRooms = tempRooms.filter(room => room.size >= minSize && room.size <= maxSize)

        //filter by breakfast
        if(breakfast) {
            tempRooms = tempRooms.filter(room => room.breakfast === true)
        }

        //filter by pets
        if(pets) {
            tempRooms = tempRooms.filter(room => room.pets === true)
        }

        this.setState({
            sortedRooms: tempRooms
        })
    };

    render() {
        return (
            <div>
                <RoomContext.Provider 
                    value={{
                        ...this.state, 
                        getRoom:this.getRoom, /* let getRoom be available in our context */
                        handleChange: this.handleChange /* let handleChange be available in our context */
                    }}
                >
                    {this.props.children}
                </RoomContext.Provider>
            </div>
        );
    }
}

const RoomConsumer = RoomContext.Consumer;

export function withRoomConsumer(Component) {
    return function consumerWrapper(props){
        return <RoomConsumer>
            {value => <Component {...props} context={value} />}
        </RoomConsumer>
    }
}

export {RoomProvider, RoomConsumer, RoomContext}