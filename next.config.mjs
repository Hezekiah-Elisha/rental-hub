/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns:[
            {
                protocol: "https",
                hostname: "api.rental.hub.ke",
                port: "",
                pathname: "/listings/image/**"
            }
        ]
    },
    async redirects(){
        return [
            {
                source: "/dashboard",
                destination: "/dashboard/home",
                permanent: true
            }
        ];
    }
};

export default nextConfig;
