import React from 'react';

function Hero({children, hero}) {
    return(
        <div>
            <header className={hero}>
            {children}
            </header>
        </div> 
    )
}

Hero.defaultProps = {
    hero: 'defaultHero' //the defaultHero is set as the default class to be rendered, so that even if i forgot to the pass the prop something is rendered
}


export default Hero;