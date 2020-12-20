import React from 'react'
import Hero from '../components/Hero'
import Banner from '../components/Banner'
import {Link} from 'react-router-dom'
import RoomContainer from '../components/RoomContainer'
import { RoomConsumer } from '../context'

const Rooms = () => {
    return(
        <div>
            <Hero hero="roomsHero"> {/* the props hero is passed a different vaalue so that a different image is shown to that of the default */}
                <Banner title="our rooms">
                    <Link className="btn-primary" to="/">back to home</Link>
                </Banner>
            </Hero>
            <RoomContainer />
        </div>
    )
}

export default Rooms