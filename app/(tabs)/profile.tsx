import { Text, View } from 'react-native'

export default function Page() {
    const members = [
        {
            id: 1,
            fullname: 'Võ Hoàng Bảo',
            studentCode: '19000002',
        },
        {
            id: 2,
            fullname: 'Nguyễn Văn A',
            studentCode: '19000003',
        },
        {
            id: 3,
            fullname: 'Nguyễn Văn B',
            studentCode: '19000004',
        },
    ]
    return (
        <View className="flex justify-center items-center min-h-screen px-5">
            <Text className="text-red-700 text-2xl font-bold mb-3 uppercase">
                Thông tin dự án
            </Text>
            <View className="w-full max-w-md bg-white rounded-lg p-4 shadow-md">
                <Text className="text-lg font-semibold mb-2">Tên dự án:</Text>
                <Text className="mb-4">App Giới thiệu sản phẩm</Text>

                <Text className="text-lg font-semibold mb-2">
                    Số lượng thành viên: {members.length}
                </Text>
                <Text className="text-lg font-semibold mb-2">Họ tên:</Text>
                <View className="pl-4">
                    {members.map((member) => (
                        <Text key={member.id} className="text-base">
                            - {member.fullname} - {member.studentCode}
                        </Text>
                    ))}
                </View>
            </View>
        </View>
    )
}
