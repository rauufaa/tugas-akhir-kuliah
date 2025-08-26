import prisma from "../connection"

export default function sportsFacilityRepository() {

    const findById = (id) => {
        const results = prisma.sportsFacility.findUnique({
            where: {
                id: id
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

    const findAll = (ownerId, sportName) => {
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

    const add = (sportsField) => {
        const results = prisma.sportsField.create({
            data: {
                sports_facility_id: sportsField.getSportsFacilityId(),
                name: sportsField.getName(),
                sport: sportsField.getSport(),
                is_indoor: sportsField.getIsIndoor(),
                owner_id: sportsField.getOwnerId(),
                price_list_id: sportsField.getPricePerHour(),
                soccer_field_type: sportsField.getSoccerFieldType(),
                tennis_field_type: sportsField.getTennisFieldType(),
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