import { createContext, useContext, useEffect, useState } from "react"
import {
	getAllCommunities,
	joinCommunity,
	leaveCommunity,
	getPostsFromAllUsersCommunities,
} from "../api/communityApi"

const CommunityContext = createContext()

export const CommunityProvider = ({ children }) => {
	const [userCommunities, setUserCommunities] = useState([])
	const [nonUserCommunities, setNonUserCommunities] = useState([])
	const [posts, setPosts] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)
	const [updateTrigger, setUpdateTrigger] = useState(false) 

	useEffect(() => {
		const fetchCommunities = async () => {
			try {
				const { userCommunities, nonUserCommunities } =
					await getAllCommunities()
				setUserCommunities(userCommunities || [])
				setNonUserCommunities(nonUserCommunities || [])
            } catch (error) {
                setError(error)
				console.error(error)
			}
		}

		const fetchPosts = async () => {
			try {
				const fetchedPosts = await getPostsFromAllUsersCommunities()
				setPosts(fetchedPosts || [])
			} catch (error) {
                setError(error)
                console.error(error)
			}
		}

        setLoading(false)
		fetchCommunities()
		fetchPosts()
	}, [updateTrigger])

	const handleJoinCommunity = async (communityId) => {
		try {
			await joinCommunity(communityId)
			setUpdateTrigger((prev) => !prev)
		} catch (error) {
			console.error(error)
		}
	}

	const handleLeaveCommunity = async (communityId) => {
		try {
			await leaveCommunity(communityId)
			setUpdateTrigger((prev) => !prev)
		} catch (error) {
			console.error(error)
		}
	}

	return (
		<CommunityContext.Provider
			value={{
				userCommunities,
				nonUserCommunities,
				posts,
				loading,
				error,
				handleJoinCommunity,
				handleLeaveCommunity,
				setUpdateTrigger,
			}}
		>
			{children}
		</CommunityContext.Provider>
	)
}

export const useCommunity = () => useContext(CommunityContext)
