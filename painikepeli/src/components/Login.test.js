
import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import LoginForm from './LoginForm'
import PlayForm from './PlayForm'


describe('<Loginform />', () => {
    let component
    const mockHandler = jest.fn()


    beforeEach(() => {
        component = render(<LoginForm
            playerAlreadyExists={mockHandler}
            newPlayer={mockHandler}
        />)
    })

    test('at start, renders content ', () => {
        expect(component.container).toHaveTextContent(`Set username Set username and start playing! First you have 20 points. Press the button and lose 1 point, but if you press the button at the right time, you might win points!Timing is everything..`)
   
    })

})

describe('<Playform />', () => {
    let component
    const mockHandler = jest.fn()

    const playerObj = {
        id: '5a451df7571c224a31b5c7aa',
        username: 'user1',
        points: '20',
        online: true
    }

    localStorage.setItem('loggedInPlayer', JSON.stringify(playerObj))


    beforeEach(() => {
        component = render(<PlayForm
            user={playerObj}
            buttonPressed={mockHandler}
            exitUser={mockHandler}
            points="20"
        />)

    })


    test('at playmode renders content', () => {
        expect(component.container).toHaveTextContent(`Let's play!`)
        expect(component.container).toHaveTextContent(playerObj.username)
        expect(component.container).toHaveTextContent(playerObj.points)
    })

    test('if button play pressed 4 times, handler is called on 4 times', () => {
        const button = component.getByText('Play')
        fireEvent.click(button)
        fireEvent.click(button)
        fireEvent.click(button)
        fireEvent.click(button)
        expect(mockHandler.mock.calls.length).toBe(4)
    })

    test('if player logged and site rendered again, player still logged', () => {
        
        const userNow = JSON.parse(localStorage.getItem('loggedInPlayer'))

        component.rerender(<PlayForm 
            user={userNow}
            buttonPressed={mockHandler}
            exitUser={mockHandler}
            points="20"/>)

        expect(component.container).toHaveTextContent(`Let's play!`)
        expect(component.container).toHaveTextContent(playerObj.username)
        expect(component.container).toHaveTextContent(playerObj.points)
    
      })
})