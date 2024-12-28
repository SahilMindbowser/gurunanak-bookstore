import PageLayout from "../layouts/page-layout/page-layout";

export default function AboutPage() {
    return (
        <PageLayout>
            <div className="space-y-4">
                <h1 className=" text-2xl font-bold">About Us</h1>
                <p>
                    Welcome to Gurunanak Bookstore, your trusted partner for books and stationery tailored to meet the needs of students, educators, and schools. We specialize in providing top-quality educational resources and supplies, both in-store and through partnerships with schools.
                </p>
                <p>
                    At Gurunanak Bookstore, we are passionate about fostering learning and creativity. From textbooks and notebooks to art supplies and classroom essentials, we offer a comprehensive selection designed to support academic excellence and inspire creativity. Whether you're a student preparing for success, a teacher shaping young minds, or a school looking for reliable partners, we’ve got you covered.
                </p>
                <div className="space-y-2">
                    <h2 className="text-lg font-semibold">What We Offer</h2>
                    <ul className="list-disc space-y-1">
                        <li className="list-inside">Wide selection of textbooks, workbooks, and educational resources</li>
                        <li className="list-inside">Art supplies, craft materials, and creative tools</li>
                        <li className="list-inside">Classroom essentials, including desks, chairs, and storage solutions</li>
                        <li className="list-inside">Partnerships with schools for bulk orders and customized solutions</li>
                    </ul>
                </div>
                <div className="space-y-2">
                    <h2 className="text-lg font-semibold">Why Choose Us</h2>
                    <ul className="list-disc space-y-1">
                        <li className="list-inside">We source only the best materials to ensure durability and performance</li>
                        <li className="list-inside">Competitive pricing for bulk orders and retail purchases</li>
                        <li className="list-inside">Dedicated to supporting schools, educators, and students</li>
                    </ul>
                </div>
                <p>Our mission is to empower the next generation of learners by providing the tools they need to succeed. We aim to build lasting relationships with schools and customers, contributing to a brighter future through education and creativity.</p>
                <p>Thank you for choosing Gurunanak Bookstore as your partner in learning. Together, let’s inspire and achieve great things!</p>
            </div>
        </PageLayout>
    );
}
