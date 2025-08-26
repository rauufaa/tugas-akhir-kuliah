// import connectionPool from "../connection";
import prisma from "../connection"

export default function priceListRepository() {
    // const {pool} = connectionPool().getPool()


    const findById = (id) => {
        const results = prisma.priceList.findUnique({
            where: {
                id
            },
        })

        return results

    }

    const findAllPaging = (search, skip, limit) => {
        const results = prisma.netflix_shows.findMany({
            skip: skip,
            take: limit,
            where: {
                title: {
                    contains: search,
                    mode: "insensitive"
                },
                deleted_at: null
            },
            orderBy: {
                release_year: "desc"
            }
        })
        return results
    }

    const add = (price) => {
        const results = prisma.priceList.create({
            data: {
                price_per_hour: price.getPricePerHour()
            }
        })
        return results

    }

    const updateById = (show) => {
        const results = prisma.netflix_shows.update({
            data: {
                type: show.getType(),
                title: show.getTitle(),
                director: show.getDirector(),
                cast_members: show.getCastMembers(),
                country: show.getCountry(),
                date_added: show.getDateAdded(),
                release_year: show.getReleaseYear(),
                rating: show.getRating(),
                duration: show.getDuration(),
                listed_in: show.getListedIn(),
                description: show.getDescription()
            },
            where: {
                show_id: show.getShowId(),
                deleted_at: null
            }
        })
        return results

    }

    const deleteById = (showId) => {

        const results = prisma.netflix_shows.update({
            data: {
                deleted_at: new Intl.DateTimeFormat('en-CA').format(new Date())
            },
            where: {
                show_id: showId,
                deleted_at: null
            }
        })
        return results


    }

    return {
        findById,
        findAllPaging,
        add,
        updateById,
        deleteById
    }
}