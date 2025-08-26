import prisma from "../connection"

export default function reservationRatingRepository() {

    const findById = (id) => {
        const results = prisma.sportsFacility.findUnique({
            where: {
                id: id
            },
        })

        return results
    }

    const findByReservationId = (reservationId) => {
        const results = prisma.reservationRating.findFirst({
            where: {
                reservation_id: reservationId
            },
        })

        return results
    }

    const findByReservationIdPaging = (reservationId) => {
        const results = prisma.reservationRating.findMany({
            where: {
                reservation_id: reservationId
            },
        })

        return results
    }

    const findAvgRatingByReservation = (reservationId) => {
        const results = prisma.reservationRating.aggregate({
            _avg: {
                rating: true
            },
            where: {
                reservation_id: reservationId
            },
        })

        return results
    }

    const findAllPaging = (ownerId, sportName, skip, limit) => {
        if (ownerId && sportName) {

            const results = prisma.sportsField.findMany({
                skip: skip,
                take: limit,
                where: {
                    owner_id: ownerId,
                    sport: sportName
                }
            })
            return results
        }
        if (ownerId) {
            const results = prisma.sportsField.findMany({
                skip: skip,
                take: limit,
                where: {
                    owner_id: ownerId,
                }
            })
            return results
        }
        if (sportName) {
            const results = prisma.sportsField.findMany({
                skip: skip,
                take: limit,
                where: {
                    sport: sportName,
                }
            })
            return results
        }
        const results = prisma.sportsField.findMany()
        return results
    }

    const findAll = () => {
        if (ownerId && sportName) {
            const results = prisma.sportsField.findMany({
                where: {
                    owner_id: ownerId,
                    sport: sportName
                }
            })
            return results
        }
        if (ownerId) {
            const results = prisma.sportsField.findMany({
                where: {
                    owner_id: ownerId,
                }
            })
            return results
        }
        if (sportName) {
            const results = prisma.sportsField.findMany({
                where: {
                    sport: sportName,
                }
            })
            return results
        }
        const results = prisma.sportsField.findMany()
        return results
    }

    const add = (rating) => {
        const results = prisma.reservationRating.create({
            data: {
                rating: rating.getRating(),
                description: rating.getDescription(),
                reservation_id: rating.getReservationId(),
            }
        })
        return results

    }

    const updateById = (sportsField) => {
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

    const deleteById = (id) => {

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
        findAll,
        add,
        updateById,
        deleteById
    }
}