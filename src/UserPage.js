import React from 'react';
import { Card } from 'antd';


class UserPage extends React.Component {

    state = {
        userAvatar: null,
        userBio: null,
        userFollowers: null,
        userFollowing: null,
        userRepos: [],
        prevProps: null
    }

    async componentDidMount() {
        if (this.props.userName !== this.state.prevProps) {
            this.setState({ prevProps: this.props.userName });
            try {
                const urlUser = `https://api.github.com/users/${this.props.userName}`;
                const urlRepos = `https://api.github.com/users/${this.props.userName}/repos`;

                const responseUser = await fetch(urlUser);
                const responseRepos = await fetch(urlRepos);

                const dataPage = await responseUser.json();
                const dataRepos = await responseRepos.json();

                this.setState({ userAvatar: dataPage.avatar_url, userBio: dataPage.bio, userFollowers: (dataPage.followers), userFollowing: (dataPage.following), userRepos: dataRepos });
            }
            catch (e) {
                console.log(e);
            }
        }
    }

    async componentDidUpdate() {
        if (this.props.userName !== this.state.prevProps) {
            this.setState({ prevProps: this.props.userName });
            try {
                const urlUser = `https://api.github.com/users/${this.props.userName}`;
                const urlRepos = `https://api.github.com/users/${this.props.userName}/repos`;

                const responseUser = await fetch(urlUser);
                const responseRepos = await fetch(urlRepos);

                const dataPage = await responseUser.json();
                const dataRepos = await responseRepos.json();

                this.setState({ userAvatar: dataPage.avatar_url, userBio: dataPage.bio, userFollowers: (dataPage.followers), userFollowing: (dataPage.following), userRepos: dataRepos });
            }
            catch (e) {
                console.log(e);
            }
        }
    }

    render() {
        return (
            <>
                {console.log(this.props.userName)}
                <br></br>
                {console.log(this.state.userRepos)}
                {this.state.userFollowers == null ? null : <img width="200" height="200" src={this.state.userAvatar} alt='' style={{ borderRadius: "50%" }} />}
                <br></br>
                {this.state.userFollowers == null ? <h1>Cheque sua conexão ou confira se digitou o nome certo :)</h1> : <h1>{this.props.userName}</h1>}
                {<h3>{this.state.userBio}</h3>}
                {this.state.userFollowers == null ? null : <h2>Following: {this.state.userFollowing} | Followers: {this.state.userFollowers}</h2>}
                {this.state.userRepos.length > 0 ? <h2>Este usuário tem {JSON.stringify(this.state.userRepos.length)} repositórios</h2> : null}
                {this.state.userFollowers == null ? null : this.state.userRepos.map((i) => (<Card title={this.state.userRepos[this.state.userRepos.indexOf(i)].name} extra={<a href={this.state.userRepos[this.state.userRepos.indexOf(i)].svn_url}>Link</a>} style={{ width: 300 }}> <p>Descrição: {this.state.userRepos[this.state.userRepos.indexOf(i)].description}</p> <p>Estrelas: {this.state.userRepos[this.state.userRepos.indexOf(i)].stargazers_count} </p> <p>Linguagem: {this.state.userRepos[this.state.userRepos.indexOf(i)].language}</p> <p>Ultima atualização: {this.state.userRepos[this.state.userRepos.indexOf(i)].updated_at}</p> {this.state.userRepos.indexOf(i).license == null ? null : <p>{this.state.userRepos[this.state.userRepos.indexOf(i)].license}</p>}</Card>))}
            </>
        )
    }
}

export default UserPage;