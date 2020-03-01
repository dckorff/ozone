import React from 'react';


import App from './App';

interface IProps {
}

export class AppContainer extends React.Component<IProps, {}> {

    public render() {
        console.log('AppContainer render');
        return (
            <div className="container m-5">
                <App />
            </div>
        );
    }

}