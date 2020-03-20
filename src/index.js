import React from 'react'
import { render } from 'react-dom'
import { articles } from './fixtures'
import Root from "./Root";



render(<Root articles={articles} />, document.getElementById('container'));
