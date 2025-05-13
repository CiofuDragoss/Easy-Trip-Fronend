import { View, Text, StyleSheet } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Gradient from "@/components/Gradient";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import PhotoList from "@/components/PhotoList";
export default function PlaceContainer({ place }) {
  const photos = [
    "places/ChIJ0RrC-a__sUARuewf4S0dwVY/photos/AXQCQNQrhJWUib-hFQ7UyAF1xhQtqNMNJi_1cUSGYE-Fg677wHgRyN89_CM-dXeYtsHdEYDL3snTsmC1WywoKNxVcJVFb31Ug4JL41nfEuM9B8usjjRm1y9kRpe1huY8SDYwN4K7lhef0cfJRaf2KG1XcHwERrYjB76e5r1qBew_ltkEn0c9DCFXkIY2N4sIEeK336hOsZFeVp-7tSyEPufloLZUVf_wOm4Lz2UBY0wcARooDubsZBFtYKFjNDEX8kZ8sayUbeBje2JY17yYwUj_VqjQzdEJKC2DG0DuW_VQn2tJIg",
    "places/ChIJ0RrC-a__sUARuewf4S0dwVY/photos/AXQCQNQ7OiSDMymJBXeoHeVC_SXpJV4ZtSM3-Se-rk5KE1VfhDVaEElNifPbIfOP-z08ZOFpDALNlNDmhZPYE9WMhaKVEaTmzJPzSt70hRvAXyRb1Afjnq1gjFL7R4rPbs25JyuMsIoSbdaaHVmDhTSbY4nHOffspaoke-BPnDNHRa64Dir6YUtPGwwTinFSw-neDg4lWJn07WAqwsszA7rZV-fD1eXDQG3SXQAvb-YhyL8BMOenve8LIxoUhiKupkuKHuG786alebE5z6tR1DOB4Q8wU4Og4CCm7qXSzczabFpWuA",
    "places/ChIJ0RrC-a__sUARuewf4S0dwVY/photos/AXQCQNSQl-lXsfaeTQ-LJ4Dn--5wwK6ZUSqCi6UKEngEZtA-RFdevOxsKFIEeYPZcd2x-kOeuhq81n8-2RIVcVn_HG9Ml-bQsQVy-Dtr2pyKKuPUhT499aRh5RG2qOg_HRqeu0rbQtfTwcc-7yRMytxOwLiY6CEQ4d5TgcjOKenX2BYL3ZOBMWNIDOeugOlbmOtJcI1GTom3g2P3vN4pF7wAWXZRAF3A2o8PaxdwM4vbVusfztGshJInvfuZU8gJx6e0zYbgFOi_BbJIXkI1_Rn3OI5FNyk8U4Tc9Dv1WeVGOCL7NA",
    "places/ChIJ0RrC-a__sUARuewf4S0dwVY/photos/AXQCQNRxFUUYRjCETkmdDai4p0VRPQDA9wHwutE0yGcfFJAsSOChL-9rStysrqSbzczoaXOOqby8Q1uXoJVNP0Q-GRR6GkOwbwv2ZwU0v4zkwwPdKAYLdxx_ZBaY4OjtMgSzdNpOkFDIpskev4wKTr0oT_hFJhTqGgKPUN73XKwcqimnvh_QccHMI3dW6kKZ5K014S5ZtbPbgg90lQf-zxU3brfjQzN-dg6hOHalFUwnfEjXaJNX2-e10BOd_iV5KFOMECGO6BeXHi6EI84pLUtkjx4j2NnsTfg-bWycJFMyn1HTIA",
    "places/ChIJ0RrC-a__sUARuewf4S0dwVY/photos/AXQCQNQno0OfLj1HoJ_keJSUDWQJOBq_OACxfS5_B-ArUfUXa9xKezViGL1VAbLCnOtdQ8kUUj-CNwsiv58R_M77qSs06ZMQJ_H0b_TWuBhBZil898dtAc7ruIcxxQeYRtjIzcMV8XsKfMTpvrItxOuXzjoBBJoNhYgXPoVLEzV3OwspSR2pZZQEL1Fik196xC7DbsecKNARmqf_yWUdWrN3bvgtDKwAfTsXZbwaNpHWB088AUk5pPWITXSYsOInM6EmQiS7mHy0Q_nfMLQd5hrY8qic-q6yOfwj95EyBBvrs3cgAg",
    "places/ChIJ0RrC-a__sUARuewf4S0dwVY/photos/AXQCQNS5bix0YbE7_okjdWWyxA1tQHRj7NBwvgQqthB-ZF11wUT5pb8kJ64Bb_fosUkf--ZtTwYu2X2dZmVK9OD96eq6SEBHRQhyZFbOytVuobSI8vbWXoAVn9a6VrASjWNK6sBhs9kkXCi_3zdYJox1VeI-EQ9krZolWlqLZ4_xxtwSN8QPSKwJfxsS3DigVfYH3QM9fSv-DB1jwEibL6gxTfUG1hXTWEQoSx1r8Mg8aNuFwTs8AYNj7a30xbamU7XSKO7kyYClmLUa3xl5F5ffhxs1-ewbWy9rW4ku0EqVNmY6bA",
    "places/ChIJ0RrC-a__sUARuewf4S0dwVY/photos/AXQCQNSA8RGQRH_wGumXLMTNtxG2DgZZq8o8AMsR5_RoTfkNSSQATtFY6t-wFTOoSznST92rAc1rh3EVMSNwbV2XYwwUa647SYS4ekrtl20U_0MzCZ6XbppQk21IwD5c7cIQ3FrorjWaxp2j1xUoFdRYCaqIdFhK2QszcnumkvvJ4-uerAGtrLWTdGtkDtIh4KR5R53sIeMJ8yXfdxt9ZeLjM_8BEeKfOQfyu8DJ_WVaVtdbcL-z29ojBHet_RvnMACf8T74mUqEVt1kKpXfiJp1iGxfXRuGGKFgPOP67Fzpps1Cqw",
    "places/ChIJ0RrC-a__sUARuewf4S0dwVY/photos/AXQCQNSYA1PGzdL3gpmkSFoebrqEhAoABBgP3t-fhmb2AOToohacZF8w9yjXoChJstLSq7hbtMxKcobYqCtiBsEYdjzwDX_t6D0Sv2cAAJEzFU0wt5laTkCqjd_Uogk6O4xEeSc2PAEAt9oAv3kFcUD2OhFXfQcULK7n4AUIc333EjhiDVIa5PffznqNvM5pxoaXIH8_jyNu9Q6U7fLEDYupgNKootYXtAUct9U8YUnx_H-LERcH_8W94ZxcKrUxwfqSaeMJ4IOt6HOvz-aN_SxKpnRJVmvbNcaK5Bg7U5yZiw8hSA",
    "places/ChIJ0RrC-a__sUARuewf4S0dwVY/photos/AXQCQNQmrb9dAuTzcTpMSpFeXAFNa4xKLeFJ2hd5Rc6_tRZg6wb7sRdRAfH3jzkONySwZeQ8Prq-DLPkdtNmRnsF7H6lnFBNjd0NYGVhkVsWnMMFjNRtk0Q5tT46KG08iKi0FgWep9BJZGuhsu_zde7aAzy4fNSi5CBgV7N8hKJfWdue6VL9itD4scy0JOkM0UwKWySE9PCAK17YKMKTH93GDLMb04LtidDZIjyQcGwcDfKKfkjiJjWFY6DOspaejjjzdfhp1_BTtJ8oOd6kdPhVjbJBR1d5GAqt75RbqNBSRs-QsA",
    "places/ChIJ0RrC-a__sUARuewf4S0dwVY/photos/AXQCQNSisSbdAXkDQf64PcCtHvC2bvVt-J8A_hj-irHyAJS1IrtePOgT17bo2HTl8YFWAVvGmZ-YDoMKOYNwOU_demImMZVat3DAuitn3604w1SHOyuk6bgK5KJ8zLml7AmVstpSlkeqbIQSsa5jd8FAwd_SMABVyYvafQ829K6dXXnfTYddwx11v05xiI6QENedTmwRxpDQzGgMQo-auingl08kVQeLxJPCBp2bieOwI34GFLNGVvoz4JN1CzheEoYMWE6JCImmrwq6IuAIbLVm-AC-Owv-6htHQWez3Hz8RoTOhA",
  ];
  return (
    <Gradient color="lightblue" style={styles.container}>
      <Text style={styles.textTitle}>Pravalia cu timbre</Text>
      <PhotoList photos={photos} />
      <Gradient color="blue" style={styles.schedule}>
        <FontAwesome
          name="clock-o"
          size={28}
          color="white"
          style={{ marginVertical: 10 }}
        />
        <Text style={styles.textBold}>Deschis acum</Text>
        <Text style={styles.text}>Luni-Vineri: 9:00 - 17:00</Text>
        <Text style={styles.text}>sambata</Text>
        <Text style={styles.text}>duminica</Text>
      </Gradient>
      <Gradient color="gold" style={styles.highligths}>
        <Text style={styles.textBold}>Puncte forte :</Text>
        <Text style={styles.text}>- 10% discount</Text>
        <Text style={styles.text}>- 20% discount</Text>
        <Text style={styles.text}>- 30% discount</Text>
      </Gradient>
      <MaterialCommunityIcons name="google-maps" size={24} color="black" />
    </Gradient>
  );
}

const styles = StyleSheet.create({
  schedule: {
    marginTop: 12,
    width: "80%",
    alignItems: "center",
    borderRadius: 15,
  },
  highligths: {
    alignItems: "center",
    width: "80%",
    alignItems: "center",
    borderRadius: 15,
  },
  container: {
    width: "90%",
    height: "90%",
    borderColor: "rgba(0, 0, 255, 0.5)",
    borderRadius: 18,
    borderWidth: 2,
    alignItems: "center",
  },
  photo: {
    width: 250,
    height: 250,
    borderRadius: 15,
    backgroundColor: "gray",
  },
  text: {
    marginHorizontal: 7,
    fontSize: 19,
    color: "white",
    fontFamily: "Poppins-Medium",
  },

  textBold: {
    fontSize: 19,
    color: "white",
    fontFamily: "Poppins-Bold",
  },

  textTitle: {
    fontSize: 22,
    color: "black",
    fontFamily: "Poppins-Bold",
  },
});
