import React from "react";
import Button from "../components/common/Button";
import Input from "../components/common/Input";
import Textarea from "../components/common/Textarea";
import Loader from "../components/common/Loader";

import Navbar from "../components/layout/Navbar";

import { FiArrowRight, FiMail, FiUser } from "react-icons/fi";

const Home = () => {
  return (
    <div>
      <Navbar />
      <h1 className="text-2xl font-semibold text-gray-800">
        UI Components Showcase
      </h1>

      {/* 🔘 BUTTONS */}
      <section className="space-y-6">
        <h2 className="text-xl font-medium text-gray-700">Buttons</h2>

        {/* Variants */}
        <div className="space-y-2">
          <p className="text-sm text-gray-500">Variants</p>
          <div className="flex flex-wrap gap-4">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="danger">Danger</Button>
            <Button variant="glass">Glass</Button>
          </div>
        </div>

        {/* Sizes */}
        <div className="space-y-2">
          <p className="text-sm text-gray-500">Sizes</p>
          <div className="flex flex-wrap items-center gap-4">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
          </div>
        </div>

        {/* States */}
        <div className="space-y-2">
          <p className="text-sm text-gray-500">States</p>
          <div className="flex flex-wrap gap-4">
            <Button loading>Loading</Button>
            <Button disabled>Disabled</Button>
          </div>
        </div>

        {/* With Icons */}
        <div className="space-y-2">
          <p className="text-sm text-gray-500">With Icons</p>
          <div className="flex flex-wrap gap-4">
            <Button icon={<FiArrowRight />}>Continue</Button>
            <Button variant="secondary" icon={<FiArrowRight />}>
              Next
            </Button>
          </div>
        </div>

        {/* Full Width */}
        <div className="space-y-2 max-w-md">
          <p className="text-sm text-gray-500">Full Width</p>
          <Button className="w-full">Full Width Button</Button>
        </div>
      </section>

      {/* 🧾 INPUTS */}
      <section className="space-y-6 max-w-md">
        <h2 className="text-xl font-medium text-gray-700">Inputs</h2>

        {/* Basic */}
        <div className="space-y-3">
          <p className="text-sm text-gray-500">Basic</p>
          <Input placeholder="Enter text" />
        </div>

        {/* With Label */}
        <div className="space-y-3">
          <p className="text-sm text-gray-500">With Label</p>
          <Input label="Name" placeholder="Enter your name" />
        </div>

        {/* With Icon */}
        <div className="space-y-3">
          <p className="text-sm text-gray-500">With Icon</p>
          <Input label="Email" icon={<FiMail />} placeholder="Enter email" />
        </div>

        {/* Password */}
        <div className="space-y-3">
          <p className="text-sm text-gray-500">Password</p>
          <Input type="password" label="Password" />
        </div>

        {/* Error */}
        <div className="space-y-3">
          <p className="text-sm text-gray-500">Error State</p>
          <Input label="Email" error="Invalid email address" />
        </div>

        {/* Helper */}
        <div className="space-y-3">
          <p className="text-sm text-gray-500">Helper Text</p>
          <Input helperText="We’ll never share your email." />
        </div>

        {/* Disabled */}
        <div className="space-y-3">
          <p className="text-sm text-gray-500">Disabled</p>
          <Input disabled placeholder="Disabled input" />
        </div>

        {/* Required */}
        <div className="space-y-3">
          <p className="text-sm text-gray-500">Required</p>
          <Input label="Username" required />
        </div>
      </section>

      {/* 📝 TEXTAREA */}
      <section className="space-y-6 max-w-md">
        <h2 className="text-xl font-medium text-gray-700">Textarea</h2>

        {/* Basic */}
        <div className="space-y-3">
          <p className="text-sm text-gray-500">Basic</p>
          <Textarea placeholder="Enter your message..." />
        </div>

        {/* With Label */}
        <div className="space-y-3">
          <p className="text-sm text-gray-500">With Label</p>
          <Textarea label="Message" placeholder="Write something..." />
        </div>

        {/* Helper Text */}
        <div className="space-y-3">
          <p className="text-sm text-gray-500">Helper Text</p>
          <Textarea helperText="Max 500 characters." />
        </div>

        {/* Error */}
        <div className="space-y-3">
          <p className="text-sm text-gray-500">Error State</p>
          <Textarea label="Message" error="Message is required" />
        </div>

        {/* Disabled */}
        <div className="space-y-3">
          <p className="text-sm text-gray-500">Disabled</p>
          <Textarea disabled placeholder="Disabled textarea" />
        </div>

        {/* Required */}
        <div className="space-y-3">
          <p className="text-sm text-gray-500">Required</p>
          <Textarea label="Feedback" required />
        </div>

        {/* Larger */}
        <div className="space-y-3">
          <p className="text-sm text-gray-500">Large Textarea</p>
          <Textarea rows={6} placeholder="Write detailed feedback..." />
        </div>
      </section>

      <Loader />
    </div>
  );
};

export default Home;
