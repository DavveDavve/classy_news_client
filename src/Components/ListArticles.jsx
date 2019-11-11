import React, { Component } from 'react'
import { getData } from '../Modules/RequestArticles'
import { Container, 
         Header, 
         Item, 
         Grid, 
         Segment,
         Image 
        } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

class ListArticles extends Component {
  state = {
    articles: [],
    error_message: null,
    renderArticleId: null
  }

  componentDidMount() {
    this.getArticles()
  }

  async getArticles() {
    let result = await getData()

    if (result.error_message) {
      this.setState({
        error_message: result.error_message
      })
    } else {
      this.setState({
        articles: result
      })
    }
  }

  render() {
    let renderListArticles, error_message, latestArticle
    const articleData = this.state.articles 

    if (this.state.error_message) {
      error_message = <p>{ this.state.error_message }</p>
    }

    if (articleData.length !== 0) {
      renderListArticles = (
        <>
          {articleData.slice(0).reverse().map(article => {
            let trim_ingress = article.content.substr(0, 75)
            let ingress = trim_ingress.substr(0, Math.min(trim_ingress.length, trim_ingress.lastIndexOf(" "))) + ' ...'

            return <NavLink id={`article_${article.id}`} key={article.id} to={`/article/${article.id}`}>
              <Item.Group> 
                <Item>
                  <Item.Image id={`image_${article.id}`} src={article.image} />
                  <Item.Content>
                    <Item.Description id={`publish_date_${article.id}`}>{article.publish_date}</Item.Description>
                    <Item.Header as="h1" id={`title_${article.id}`}>{article.title}</Item.Header>
                    <Item.Meta id={`content_${article.id}`} name="article-content">{ingress}</Item.Meta>
                    <Item.Extra id={`author_${article.id}`}>{article.author}</Item.Extra>
                  </Item.Content>
                </Item>
              </Item.Group> 
            </NavLink>
          })}
        </>
      )

      latestArticle = (
        <>
        {articleData.reduce(function(prev, current) {
          let trim_ingress = current.content.substr(0, 75)
          let ingress = trim_ingress.substr(0, Math.min(trim_ingress.length, trim_ingress.lastIndexOf(" "))) + ' ...'
          if (current.id > prev.id || prev.key) {
            return <NavLink id={`article_${current.id}`} key={current.id} to={`/article/${current.id}`}>
                         <Item.Group> 
                          <Image id={`image_${current.id}`} size='large' src={current.image} />
                            <Item>
                              <Item.Content>
                                <Item.Description id={`publish_date_${current.id}`}>{current.publish_date}</Item.Description>
                                <Item.Header as="h5" id={`title_${current.id}`}>{current.title}</Item.Header>
                                <Item.Meta id={`content_${current.id}`} name="article-content">{ingress}</Item.Meta>
                                <Item.Extra id={`author_${current.id}`}>{current.author}</Item.Extra>
                              </Item.Content>
                            </Item>
                          </Item.Group> 
                        </NavLink>
            }
          }
        )}
        </>
      )
    }
      
    return(
      <>
      <Container>
        <Grid columns={2}>
          <Grid.Column floated='left' width={9}>
            <Item.Group>
              <Header as='h1' id="header-title">
                Breaking News
              </Header>

              <Container id="latest_news">
                {latestArticle}
              </Container>
            </Item.Group>
          </Grid.Column>

          <Grid.Column floated='center' width={7}>
           <br></br>
           <br></br>
            <Segment>
              <Item.Group>
                <center><Header as='h2'>
                  Latest News
                </Header></center>
                </Item.Group>
                </Segment> 
                {renderListArticles}
            </Grid.Column>
        </Grid>
        {error_message}
        </Container> 
      </>
    )
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.reduxTokenAuth.currentUser
  }
}

export default connect(
  mapStateToProps, 
  null
  )(ListArticles)