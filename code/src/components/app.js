import React from "react"
import openGdaxWebsocket from "../gdax-websocket"
import { LineChart, Line, Tooltip, YAxis, XAxis, CartesianGrid } from 'recharts'

class App extends React.Component {

  state = {
    tickerMessages: []
  }

  componentDidMount() {
    this.websocket = openGdaxWebsocket("BTC-EUR", this.handleNewTickerMessage)
  }

  componentWillUnmount() {
    this.websocket.close()
  }

  handleNewTickerMessage = newTickerMessage => {
    this.setState(previousState => ({
      tickerMessages: previousState.tickerMessages.concat([newTickerMessage])
    }))
  }

  render() {
    return (
      <div>
        <div className="chart-container">
          <h2>Bitcoin ticker</h2>
          <div className="chart">
            <LineChart width={800} height={500} data={this.state.tickerMessages}>
              <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
              <YAxis dataKey="price" />
              <XAxis dataKey="time" />
              <Tooltip />
              <Line type="monotone" dataKey="price" stroke="#8884d8" />
            </LineChart>
          </div>
        </div>
      </div>
    )
  }

}

export default App
