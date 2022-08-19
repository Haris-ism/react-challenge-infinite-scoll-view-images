import SimpleReactLightbox, { SRLWrapper } from 'simple-react-lightbox';
import { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import InfiniteScroll from 'react-infinite-scroll-component';
const ImagesGrid = () => {
    const [PAGE, setPAGE] = useState(1)
    const [itemData, setItemData] = useState([])
    const KEY = '0cvqfHnCybG9zuZQ5Xnkggi7roUuBOu_XdBIlyEGUJw'
    useEffect(() => {
        fetch(`https://api.unsplash.com/photos?page=${PAGE}&query=curated&client_id=${KEY}`)
            .then(res => res.json())
            .then(result => {
                const data = result.map(item => {
                    return { img: item.urls.regular, title: item.user.name }
                })
                setItemData([...itemData.concat(...data)])
            })
            .catch(err => {
                alert("something went wrong please try again later")
                console.log("this is the error", err.message)
            })
    }, [PAGE])
    return (
        <SimpleReactLightbox>
            <SRLWrapper>
                <InfiniteScroll
                    dataLength={itemData.length} //This is important field to render the next data
                    next={() => setPAGE(prev => prev + 1)}
                    hasMore={true}
                    loader={<h4>Loading...</h4>}
                    endMessage={
                        <p style={{ textAlign: 'center' }}>
                            <b>All Data Already Displayed</b>
                        </p>
                    }
                >
                    <Box
                        sx={{ flexGrow: 1 }}
                    >
                        <Grid
                            container
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                        >
                            {itemData.map(item => (
                                <Grid
                                    margin={1}
                                    alignItems="center"
                                    justifyContent="center"
                                    display="flex"
                                >
                                    <img
                                        width={400}
                                        src={item.img}
                                        alt={item.title}
                                        loading="lazy"
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                </InfiniteScroll>
            </SRLWrapper>
        </SimpleReactLightbox>
    );
}

export default ImagesGrid